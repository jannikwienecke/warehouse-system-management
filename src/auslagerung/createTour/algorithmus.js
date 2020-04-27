import {
  EURO,
  INDUSTRY,
  DIMENSIONS,
  MAX_HEIGHT,
  LKW_12,
  LKW_7,
} from "./constants";
import {
  removeValidatedPallets,
  getIndexOfType,
  getSortedListBy,
  unpackPalletGroups,
  copy,
  isMinSpace,
} from "./helper";

var BreakException = {};
export const validate = (pallets, vehicles) => {
  // console.log("VALIDATE PALLETS = ", pallets);

  const fitsHeight = (pallet) => {
    // const { length } = DIMENSIONS[pallet.packagingId];
    const { length } = pallet;
    if (height_counter + length < MAX_HEIGHT) {
      return true;
    } else {
      return false;
    }
  };

  const fitsAny = (length) => {
    const heightLeft = MAX_HEIGHT - height_counter;

    if (length) {
      if (heightLeft >= length) {
        return true;
      } else {
        return false;
      }
    }

    if (heightLeft >= 800) {
      return true;
    } else {
      return false;
    }
  };

  const nextLkw = (pallet) => {
    LKW.push(currentRow);
    trucks.push({
      lkw: currentLKW,
      arr: LKW,
    });
    LKW = [];
    currentRow = [];

    const { length, width } = pallet;
    // const { length, width } = DIMENSIONS[pallet.packagingId];

    width_counter = width;
    height_counter = length;

    counter_lkw++;
    var lkwIndex = counter_lkw % vehicles.length;
    currentLKW = vehicles[lkwIndex];
  };

  const addNewRowInLKW = (width, length, pallet) => {
    width_counter += width;
    height_counter = length;

    var newLkw = false;
    if (width_counter > currentLKW.lengthLoading) {
      nextLkw(pallet);
      newLkw = true;
      currentRow.push(pallet);
    }

    if (!newLkw && width_counter > 0) {
      if (currentRow.length > 0) {
        LKW.push(copy(currentRow));
      }

      currentRow = [];
      currentRow.push(pallet);
    }
  };

  const addToDelivery = (pallet, index) => {
    // console.log(`---Add To Delivery Index--${pallet.id}- `);
    // console.log(pallet);

    // const { length, width } = DIMENSIONS[pallet.packagingId];
    const { length, width } = pallet;

    indexRemove.push(pallet.id);

    if (width_counter === 0) {
      addNewRowInLKW(width, length, pallet);
    } else if (!fitsAny(length)) {
      addNewRowInLKW(width, length, pallet);
    } else {
      currentRow.push(copy(pallet));

      height_counter += length;
    }
  };

  const validateIfPalletToFindIsSingle = (availablePallets, typeToFind) => {
    var indexOfType = getIndexOfType(availablePallets, typeToFind);
    var quantity = typeToFind === EURO ? 2 : 1;

    if (indexOfType.length === quantity) {
      return indexOfType;
    } else {
      return false;
    }
  };

  const getPalletsOfType = (packagingId, availablePallets) => {
    return availablePallets.filter(
      (pallet) => pallet.packagingId === packagingId
    );
  };

  const isOddQuantityOfType = (packagingId, availablePallets) => {
    var palletsOfType = getPalletsOfType(packagingId, availablePallets);

    var divider = packagingId === EURO ? 3 : 2;
    return palletsOfType.length % divider !== 0;
  };

  const validateIfPalletToFindIsOddQuantity = (
    availablePallets,
    typeToFind
  ) => {
    // console.log("validateIfPalletToFindIsOddQuantity...", typeToFind);

    const allTypes = getSortedListBy(typeToFind);
    var indexOfType = null;

    allTypes.forEach((packagingId) => {
      if (!indexOfType) {
        var isOdd = isOddQuantityOfType(packagingId, availablePallets);
        if (isOdd) {
          indexOfType = getIndexOfType(availablePallets, packagingId);
          if (packagingId !== typeToFind) {
            addCurrentIndex = currentIndex;
          }
        }
      }
    });
    if (indexOfType) {
      return [indexOfType[0]];
    } else {
      return false;
    }
  };

  const findSinglePalletIndex = (availablePallets, typeToFind) => {
    // console.log("findSinglePalletIndex availablePallets", availablePallets);

    var indexFound = validateIfPalletToFindIsSingle(
      availablePallets,
      typeToFind
    );

    indexFound = validateIfPalletToFindIsOddQuantity(
      availablePallets,
      typeToFind
    );

    if (indexFound) return indexFound;
  };

  const addPalletsOfIndexToDelivery = (pallets, index, indexList) => {
    // console.log("addPalletsOfIndexToDelivery ", pallets, index, indexList);

    if (addCurrentIndex) {
      addToDelivery(pallets[currentIndex], currentIndex);
    }

    indexList.forEach((index_) => {
      const indexAdd = index + index_ + 1;
      const palletToAdd = pallets[indexAdd];
      addToDelivery(palletToAdd, indexAdd);
    });

    throw BreakException;
  };

  const validateIfOtherPalletFits = (pallet, index, typeToFind) => {
    // console.log("validateIfOtherPalletFits...", typeToFind);

    var availablePallets = pallets.slice(index + 1);

    const indexList = findSinglePalletIndex(availablePallets, typeToFind);

    if (indexList && indexList[0] !== undefined) {
      addPalletsOfIndexToDelivery(pallets, index, indexList);
      return true;
    } else {
      // addToDelivery(pallet, index);
      return false;
    }
  };

  const handlePalletOnNextRow = (pallet, index) => {
    // console.log("handlePalletOnNextRow...");
    addToDelivery(pallet, index);
  };

  const handlePalletFitsPerfectOnRow = (pallet, index) => {
    // console.log("handlePalletOnNextRow...");
    addToDelivery(pallet, index);
  };

  const handlePalletFitsNotPerfectOnRow = (pallet, index, heightLeft) => {
    // console.log("handlePalletFitsNotPerfectOnRow...", heightLeft);
    const packagingId = pallet.packagingId;

    let result;
    if (heightLeft >= 800) {
      addToDelivery(pallet, index);
      return;
    } else if (packagingId === EURO && heightLeft > 400 && heightLeft < 800) {
      result = validateIfOtherPalletFits(pallet, index, INDUSTRY);
    } else if (
      packagingId === INDUSTRY &&
      heightLeft > 400 &&
      heightLeft < 1200
    ) {
      result = validateIfOtherPalletFits(pallet, index, EURO);
    }
    if (!result) {
      // console.log("-------------------------------------------------ADDDDDD");
      addToDelivery(pallet, index);
    }
  };

  const handlePalletDoesNotFit = (pallet, index, heightLeft) => {
    // console.log("handlePalletDoesNotFit...");
    const packagingId = pallet.packagingId;
    // const { length } = DIMENSIONS[pallet.packagingId];
    const { length } = pallet;

    heightLeft += length;

    if (packagingId === INDUSTRY && heightLeft >= 800) {
      var typeToFind = EURO;
    }

    if (!validateIfOtherPalletFits(pallet, index, typeToFind)) {
      addToDelivery(pallet, index);
    }
  };

  const sort_ = (pallets_) => {
    pallets_.forEach((pallet, index) => {
      // console.log(`------------${pallet.id}----------`);
      // console.log("pallet", pallet);

      currentIndex = index;
      addCurrentIndex = false;

      const { length } = pallet;
      // const { length } = DIMENSIONS[pallet.packagingId];
      const heightLeft = MAX_HEIGHT - height_counter - length;

      if (!fitsAny()) {
        handlePalletOnNextRow(pallet, index);
      } else if (fitsHeight(pallet) && heightLeft < 200) {
        handlePalletFitsPerfectOnRow(pallet, index);
      } else if (fitsHeight(pallet) && heightLeft >= 200) {
        handlePalletFitsNotPerfectOnRow(pallet, index, heightLeft);
      } else {
        handlePalletDoesNotFit(pallet, index, heightLeft);
      }
    });
  };

  const loopUntilAllPaletsOnLkw = () => {
    for (var xx = 0; xx < 100; xx++) {
      pallets = removeValidatedPallets(pallets, indexRemove);

      if (pallets.length === 0) break;

      try {
        indexRemove = [];
        sort_(pallets);
      } catch (e) {
        if (e !== BreakException) {
          throw e;
        }
      }
    }
  };

  const addLeftOverLoading = () => {
    LKW.push(currentRow);
    trucks.push({
      lkw: currentLKW,
      arr: LKW,
    });
  };

  // const vehicles = [LKW_12, LKW_7];
  var trucks = [];
  var counter_lkw = 0;
  var currentLKW = vehicles[0];
  var indexRemove = [];
  var width_counter = 0;
  var height_counter = 0;
  var addCurrentIndex = false;
  var currentIndex = null;
  var LKW = [];
  var currentRow = [];

  pallets = unpackPalletGroups(pallets);

  loopUntilAllPaletsOnLkw();

  addLeftOverLoading();

  reorderLoadings_(trucks);

  return trucks;
};

const reorderLoadings_ = (trucks) => {
  validateTrucks(trucks);
  createLoading(trucks);
  findFreeSpaces(trucks);
  insertFreeSpacesInto(trucks);
};

const insertFreeSpacesInto = (trucks) => {
  const loopLoadings = (trucks) => {
    const insertSpace = (space) => {
      currentLoading.pallets.splice(space.palletIndex, 0, space);
    };

    const loopSpaces = (freeSpaces) => {
      freeSpaces.forEach((space) => {
        insertSpace(space);
      });
    };

    var currentLoading = null;
    trucks.forEach((loading) => {
      currentLoading = loading;
      loopSpaces(loading.freeSpaces);
    });
  };

  loopLoadings(trucks);
};

const findFreeSpaces = (trucks) => {
  const addToFreeSpaces = (width, length, packagingId) => {
    freeSpaces.push({
      freeSpaceType: packagingId,
      length,
      width,
      position: {
        row: rowCounter,
        column: columnCounter,
      },
      palletIndex: palletIndexCounter,
    });
    palletIndexCounter++;
  };

  const validateTotalWidth = (loading) => {
    const freeTotalWidth = currentLKW.lengthLoading - totalWidth;

    rowCounter = 0;
    palletIndexCounter++;

    if (isMinSpace(freeTotalWidth, currentLKW.width)) {
      addToFreeSpaces(freeTotalWidth, currentLKW.width, "end");
    }
    loading["freeSpaces"] = freeSpaces;
    loading["totalWidth"] = totalWidth;
  };

  const resetTempValues = () => {
    freeSpaces = [];
    totalWidth = 0;
    columnCounter = 0;

    palletIndexCounter = 0;
  };

  const validateColumn = (column) => {
    const validateColumnValues = () => {
      const freeHeight = currentLKW.width - currentHeight;
      const freeWidth = currentMaxWidth;

      if (isMinSpace(freeWidth, freeHeight)) {
        addToFreeSpaces(currentMaxWidth, freeHeight, "filler");
      }

      totalWidth += currentMaxWidth;
      rowCounter = 0;
    };

    const updateColumnValues = (width, length) => {
      rowCounter++;
      palletIndexCounter++;
      currentHeight += length;
      if (width > currentMaxWidth) {
        currentMaxWidth = width;
      }
    };

    const loopColumn = () => {
      column.forEach((pallet) => {
        const { width, length } = pallet;
        // const { width, length } = DIMENSIONS[pallet.packagingId];
        updateColumnValues(width, length);
      });
    };

    var currentHeight = 0;
    var currentMaxWidth = 0;
    loopColumn();
    validateColumnValues(currentMaxWidth, currentHeight);
  };

  const loopLoadingArr = (arr) => {
    arr.forEach((column) => {
      validateColumn(column);
      columnCounter++;
    });
  };

  const loopLoadings = (trucks) => {
    trucks.forEach((loading) => {
      var { lkw, arr } = loading;
      currentLKW = lkw;

      loopLoadingArr(arr);
      validateTotalWidth(loading);
      resetTempValues();
    });
  };

  var currentLKW = null;
  var freeSpaces = [];
  var totalWidth = 0;
  var rowCounter = 0;
  var columnCounter = 0;
  var palletIndexCounter = 0;
  loopLoadings(trucks);
};

const validateTrucks = (trucks) => {
  var currentLKW = null;
  var totalWidth = 0;
  const validateColumn = (column) => {
    const updateColumnValues = (pallet, length, width) => {
      currentHeight += length;

      if (totalWidth + width > currentLKW.lkw.maxLoading) {
        palletsMoveLKW.push(pallet);
      } else if (currentHeight > 2400) {
        palletsToMoveNextRow.push(copy(pallet));
        removeLastPallet = true;
      } else if (width > currentMaxWidth) {
        currentMaxWidth = width;
      }
    };

    const loopColumn = () => {
      column.forEach((pallet) => {
        const { width, length } = pallet;
        // const { length, width } = DIMENSIONS[pallet.packagingId];
        if (palletsToMoveNextRow.length > 0) {
          palletsToMoveNextRow.push(copy(pallet));
        } else {
          updateColumnValues(pallet, length, width);
        }
      });
    };

    const removeFromColumn = (pallet) => {
      //   const indexRemove = findIndexPalletInArr(copy(currentLKW), pallet.id);
      alert("NEEDS TO BE IMPLEMENTTED 'removeFromColumn'");
    };

    const finishColumn = () => {
      totalWidth += currentMaxWidth;
      if (removeLastPallet) {
        palletsToMoveNextRow.forEach((pallet_) => {
          column.pop();
        });
      }
      if (palletsMoveLKW.length > 0) {
        palletsMoveLKW.forEach((palletToMove) => {
          removeFromColumn(palletToMove);
        });
      }
    };

    var currentHeight = 0;
    var currentMaxWidth = 0;
    var removeLastPallet = false;

    loopColumn();

    finishColumn();
  };

  const validateTruck = (truck) => {
    truck.arr.forEach((column) => {
      if (palletsToMoveNextRow) {
        palletsToMoveNextRow.forEach((palletInsert) => {
          column.splice(0, 0, palletInsert);
        });

        palletsToMoveNextRow = [];
      }

      validateColumn(column);
    });
  };

  const _validate = () => {
    trucks.forEach((truck) => {
      currentLKW = truck;

      validateTruck(truck);
      totalWidth = 0;
    });
    if (palletsToMoveNextRow.length > 0) {
      trucks[trucks.length - 1].arr.push(palletsToMoveNextRow);
      palletsToMoveNextRow = [];
      palletsMoveLKW = [];
      validateTrucks(trucks);
    }
  };

  var palletsToMoveNextRow = [];
  var palletsMoveLKW = [];
  currentLKW = null;
  _validate();
};

const createLoading = (trucks) => {
  trucks = trucks.map((truck) => {
    var palletsTruck = [];

    truck.arr.forEach((column) => {
      column.forEach((pallet) => {
        palletsTruck.push(pallet);
      });
    });

    truck.pallets = palletsTruck;
    return truck;
  });
};

export const reorderLoadings = reorderLoadings_;
