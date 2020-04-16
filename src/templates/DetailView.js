import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";
import { ListWrapper, ListItem, ValueText } from "./StylesDetailView";
import { translate } from "../functions/utils";
import { UpdateForm } from "./UpdateForm";

const DetailView = (props) => {
  const { rowData, isSubmitted, runFunc, trigger } = props;
  const [row, setRow] = useState(null);

  console.log("ROW = ", row);

  useEffect(() => {
    if (rowData) {
      setRow(rowData.original);
    }
  }, [rowData]);

  //   useEffect(() => {
  //     if (isSubmitted) {
  //       console.log("SUBMIT FUNC", rowData);
  //     }
  //   }, [isSubmitted, rowData]);

  const rowDataList = () => {
    const columns = Object.keys(row);

    return columns.map((column) => {
      let val = row[column];
      if (typeof val === "object") {
        val = val[Object.keys(val)[0]];
      } else if (typeof val === "boolean") {
        val = val ? "Ja" : "Nein";
      }
      return (
        <ListItem numberItems={columns.length}>
          {translate(column)}: <ValueText>{val}</ValueText>
        </ListItem>
      );
    });
  };

  if (!row) return null;
  return (
    <>
      {runFunc === trigger ? (
        <UpdateForm values={row} setRow={setRow} {...props} />
      ) : (
        <ListWrapper numberItems={Object.keys(row).length}>
          {rowDataList()}
        </ListWrapper>
      )}
    </>
  );
};

export default withApollo(DetailView);