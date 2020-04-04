import React, { useState, useEffect } from "react";

import { LoadingZone, PalleteWrapper, LKW } from "./styles";
import { DIMENSIONS } from "./constants";
import { compare, findIndexPalletInArr } from "./helper";
import { validate, reorderLoadings } from "./algorithmus";
import { Box } from "@material-ui/core";
import styled from "styled-components";

const Pallets = ({ delivery }) => {
  const [trucks, setTrucks] = useState(null);
  const [_, setRerender] = useState(null);
  const [palletFocus, setPalletFocus] = useState(null);

  useEffect(() => {
    getTrucks();
  }, [delivery]);

  const render_ = () => {
    setTrucks(trucks);
    setPalletFocus(null);
    setRerender(true);
    setTimeout(() => {
      setRerender(false);
    }, 5);
  };

  const switchSpaces = (index, indexLkw, pallet) => {
    const swapValues = (index1, index2, lkw1, lkw2) => {
      var temp_pallet = null;

      temp_pallet = trucks[lkw1].arr[index1[0]][index1[1]];
      trucks[lkw1].arr[index1[0]][index1[1]] =
        trucks[lkw2].arr[index2[0]][index2[1]];

      trucks[lkw2].arr[index2[0]][index2[1]] = temp_pallet;
    };

    const switchPositionArr = () => {
      var indexPallet = findIndexPalletInArr(trucks[lkwPallet], idPallet);
      var indexFocus = findIndexPalletInArr(trucks[lkwFocus], idFocus);

      swapValues(indexPallet, indexFocus, lkwPallet, lkwFocus);
    };

    const lkwPallet = indexLkw;
    const idPallet = pallet.id;
    const lkwFocus = palletFocus.indexLkw;
    const idFocus = palletFocus.pallet.id;

    switchPositionArr();
    reorderLoadings(trucks);
    render_();
  };

  const isSamePallet = (indexLkw, index) => {
    if (
      palletFocus &&
      index === palletFocus.index &&
      indexLkw === palletFocus.indexLkw
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClickFreeSpace = (indexLkw, index, freeSpace) => {
    console.log("CLICK FREE SPACE...", indexLkw, index, freeSpace);
    const { column, row } = freeSpace.position;
    if (palletFocus) {
      const { width, height } = DIMENSIONS[palletFocus.pallet.type];

      if (width <= freeSpace.width && height <= freeSpace.height) {
        var indexPallet = findIndexPalletInArr(
          trucks[palletFocus.indexLkw],
          palletFocus.pallet.id
        );

        if (trucks[indexLkw].arr[column]) {
          trucks[indexLkw].arr[column][row] = palletFocus.pallet;
        } else {
          trucks[indexLkw].arr.push([palletFocus.pallet]);
        }
        trucks[palletFocus.indexLkw].arr[indexPallet[0]].splice(
          indexPallet[1],
          1
        );

        reorderLoadings(trucks);
      }
      render_();
    }
  };

  const setFocus = (index, indexLkw) => {
    setPalletFocus({
      pallet: JSON.parse(JSON.stringify(trucks[indexLkw].pallets[index])),
      index,
      indexLkw
    });
  };

  const handleClickPallete = (indexLkw, index, pallet) => {
    if (isSamePallet(indexLkw, index)) {
      setPalletFocus(null);
    } else if (!palletFocus) {
      setFocus(index, indexLkw);
    } else {
      switchSpaces(index, indexLkw, pallet);
    }
  };

  const renderList = () => {
    if (!trucks) return <h1>Loading..</h1>;

    return trucks.map((loading, indexLkw) => {
      const { pallets, lkw } = loading;
      return pallets.map((pallete, index) => {
        return (
          <p>
            {pallete.id} {pallete.product} {pallete.building}
          </p>
        );
      });
    });
  };

  const renderTrucks = () => {
    if (!trucks) return <h1>Loading..</h1>;
    return trucks.map((loading, indexLkw) => {
      const { pallets, lkw } = loading;
      return (
        <Wrapper>
          <Box
            boxShadow={3}
            bgcolor="background.paper"
            p={5}
            maxWidth="800px"
            // display="inline"
            style={{ margin: "1rem auto" }}
          >
            <LKW key={indexLkw} count={indexLkw + 1} width={lkw.maxWidth}>
              <LoadingZone width={lkw.maxLoading}>
                {pallets.map((pallete, index) => {
                  pallete["isSelected"] = false;

                  if (palletFocus && pallete.id === palletFocus.pallet.id) {
                    pallete.isSelected = true;
                  }

                  if (!pallete.position) {
                    return (
                      <PalleteWrapper
                        onClick={() =>
                          handleClickPallete(indexLkw, index, pallete)
                        }
                        type={pallete.type}
                        isSelected={pallete.isSelected}
                      >
                        <PalletText>
                          Gebäude: {pallete.building}({pallete.factory}),
                          Produkt: {pallete.product}
                        </PalletText>
                      </PalleteWrapper>
                    );
                  } else {
                    return (
                      <PalleteWrapper
                        onClick={() =>
                          handleClickFreeSpace(indexLkw, index, pallete)
                        }
                        isSelected={pallete.isSelected}
                        width={pallete.width}
                        height={pallete.height}
                        freeSpaceType={pallete.freeSpaceType}
                      />
                    );
                  }
                })}
              </LoadingZone>
            </LKW>
          </Box>
        </Wrapper>
      );
    });
  };

  const getTrucks = () => {
    const sorted = delivery.sort(compare);
    const loadings = validate(sorted);
    setTrucks(loadings);
  };

  console.log("STATUS TRUCKS : ", trucks);

  return (
    <>
      {renderTrucks()}
      {renderList()}
    </>
  );
};

export default Pallets;

const Wrapper = styled.div`
  margin: 0 auto;
`;

const PalletText = styled.div`
  font-size: 0.9rem;
  line-height: 1.2rem;
  font-family: auto;
  padding-top: 10px;
`;
