import { EURO, INDUSTRY, DIMENSIONS } from "./constants";

export const compare = (a, b) => {
  if (a.factory === 1 && b.factory === 2) {
    return -1;
  }
  if (a.factory === b.factory) {
    if (a.type === EURO && b.type === INDUSTRY) {
      return -1;
    }
  } else return 1;
};

export const removeValidatedPallets = (pallets, indexRemove) => {
  return pallets.filter((pallet, index) => {
    var indexLeft = !indexRemove.includes(pallet.id);
    return indexLeft;
  });
};

export const getIndexOfType = (palletArr, type) => {
  var indexOfType = [];
  palletArr.forEach((pallet, index) => {
    if (pallet.type === type) {
      indexOfType.push(index);
    }
  });
  return indexOfType;
};

export const getSortedListBy = (typeToFind) => {
  const allTypes = Object.keys(DIMENSIONS);
  allTypes.sort((a, b) => {
    if (a === typeToFind) {
      return -1;
    } else {
      return 1;
    }
  });
  return allTypes;
};

export const unpackPalletGroups = (pallets) => {
  var pallets_ = [];
  // debugger;
  pallets.forEach((pallet, index) => {
    return [...Array(pallet.quantity).keys()].forEach((i) => {
      pallet.id = `${index}_${i}`;

      pallets_.push(JSON.parse(JSON.stringify(pallet)));
    });
  });

  // pallets_ = pallets_.map(pallet => {
  //   pallet.quantity = 1;
  //   return pallet;
  // });
  return JSON.parse(JSON.stringify(pallets_));
};

export const copy = (el) => {
  return JSON.parse(JSON.stringify(el));
};

export const isMinSpace = (width, height) => {
  var isValid = false;
  if (width >= 120 && height >= 80) {
    isValid = true;
  } else if (width >= 100 && height >= 120) {
    isValid = true;
  }

  return isValid;
};

export const findIndexPalletInArr = (truck, id) => {
  // console.log("TO FIND", truck, id);

  var index_column = null;
  var index_row = null;
  truck.arr.forEach((column, index_column_) => [
    column.forEach((pallet, index_row_) => {
      if (pallet.id === id) {
        index_column = index_column_;
        index_row = index_row_;
      }
    }),
  ]);

  return [index_column, index_row];
};
