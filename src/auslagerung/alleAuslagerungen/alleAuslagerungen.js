import React, { useState, useEffect } from "react";
import { SUB_PAGES } from "../data";
import { mockAPI, setArrInputSize } from "../../functions/utils";
import { INPUT, COLUMNS } from "../../baseComponents/base";
import { endGreaterStart, extractIdentifier } from "../../functions/middleware";
import { Parent } from "../../baseComponents/Parent";
import { fetchAuslagerungen } from "../store";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const columns = [
  COLUMNS.tour,
  COLUMNS.datetime,
  COLUMNS.customer,
  COLUMNS.product,
  COLUMNS.quantity,
  COLUMNS.row,
  COLUMNS.driver,
];

const arrInput = [
  INPUT.customers,
  INPUT.products,
  INPUT.dateStart,
  INPUT.dateEnd,
];

setArrInputSize(arrInput, 6);

export const AlleAuslagerungen = ({ setType, type }) => {
  return (
    <>
      <Parent
        header={{
          name: "Alle Auslagerunge",
          setType: setType,
          type: type,
          sub_pages: SUB_PAGES,
        }}
      />

      <Test>
        <SelectWrapper>
          <SelectType type="text" placeholder="Statistik wählen" />
        </SelectWrapper>
        <Options>
          <Option>Test 1</Option>
          <Option>Test 1</Option>
          <Option>Test 1</Option>
        </Options>
      </Test>

      <Parent
        table={{
          columnsArr: columns,
          dataName: "auslagerungen",
          initFunc: (dispatch) => dispatch(fetchAuslagerungen()),
          middleware: [(data) => console.log("DATA VALIDATION")],

          clickRow: {
            func: (rowData) => <DetailView rowData={rowData} />,
            baseComponent: {
              type: "Popup",
              settings: {
                height: "80vh",
                heightHeader: "35%",
              },
            },
          },
        }}
        form={{
          formTitle: "Auslagerungen Suchen",
          arrInput: arrInput,
          middlewareValidation: [endGreaterStart],
          middlewareParse: [extractIdentifier],
          requiredArguments: [INPUT.customers.name],
          cardWrapper: true,
          apiFunc: (dispatch, parameter) => {
            return mockAPI({}, parameter, 1000).then((res) =>
              dispatch(fetchAuslagerungen)
            );
          },
        }}
      ></Parent>
    </>
  );
};

const DetailView = ({ name, rowData, isSubmitted }) => {
  useEffect(() => {
    console.log("SUBMIT FUNC", rowData);
  }, [isSubmitted]);

  return (
    <>
      <h1>Zusammenfassung Auslagerung</h1>
      <h3>Kunde : {rowData.original.customer_id}</h3>
    </>
  );
};

const Test = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SelectWrapper = styled.div`
  // text-align: right;
  display: flex;
  flex-direction: column;
  width: 30%;
`;
const SelectType = styled.input`
  border: 0.5px solid #ddd;
  padding: 1rem;
  border-radius: 1rem;
  // width: 30%;
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  font-weight: 700;
  // margin-right: 5rem;
  :focus {
    outline: none;
  }
`;

const Options = styled.span`
  display: flex;
  flex-direction: column;
  width: 28%;
  background: #eee;
  margin-top: 0.2rem;
`;

const Option = styled.span`
  // width: 30%;
`;
