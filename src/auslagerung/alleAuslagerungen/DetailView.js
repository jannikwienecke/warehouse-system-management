import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";
import {
  ListWrapper,
  ListItem,
  ValueText,
} from "../../wareBaseData/StylesDetailView";
import { translate } from "../../functions/utils";
import { UpdateForm } from "./UpdateForm";

const DetailView = (props) => {
  const { rowData, isSubmitted, runFunc } = props;

  const [row, setRow] = useState(null);

  useEffect(() => {
    if (rowData) {
      setRow(rowData.original);
    }
  }, [rowData]);

  const rowDataList = () => {
    const columns = Object.keys(row);

    return columns
      .filter((column) => {
        let val = row[column];
        return (
          val &&
          typeof val !== "object" &&
          !column.toLowerCase().includes("__type")
        );
      })
      .map((column, index) => (
        <ListItem key={index} numberItems={columns.length}>
          {translate(column.split("_name")[0])}:{" "}
          <ValueText>{row[column]}</ValueText>
        </ListItem>
      ));
  };

  if (!row) return null;
  return (
    <>
      {runFunc === "update" ? (
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
