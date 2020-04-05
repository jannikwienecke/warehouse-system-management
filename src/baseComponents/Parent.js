import React, { useState, useEffect } from "react";

import { HeaderElement } from "../common/HeaderElement";
import { Form } from "../baseComponents/Form";
import { Table } from "../baseComponents/Table";

export const Parent = (props) => {
  const { setType, type, sub_pages } = props;
  const [selectedRow, selectRow] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [apiRequest, setApiRequest] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (apiRequest) makeApiRequest();
  }, [apiRequest]);

  useEffect(() => {
    props.initFunc(setTableData, props.initParameter);
  }, []);

  useEffect(() => {
    if (tableData) {
      setLoading(false);
    }
  }, tableData);

  const makeApiRequest = () => {
    console.log(`${props.name}: MOCK API REQUEST - ${apiRequest}`);

    setLoading(true);
    setTableData(null);
    props.formApiRequest(setTableData, apiRequest);
  };

  return (
    <>
      <HeaderElement setType={setType} type={type} sub_pages={sub_pages} />

      <Form
        {...props.form}
        isLoading={isLoading}
        setApiRequest={setApiRequest}
      />
      <Table {...props.table} tableData={tableData} />
    </>
  );
};
