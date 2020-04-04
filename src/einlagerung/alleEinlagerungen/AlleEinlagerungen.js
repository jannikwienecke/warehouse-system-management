import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { SUB_PAGES } from "../data";
import { HeaderElement } from "../../common/HeaderElement";
import { mockAPI } from "../../functions/utils";
import { data } from "./data";
import { Form } from "./Form";

export const AlleEinlagerungen = ({ setType, type }) => {
  const [selectedRow, selectRow] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    mockAPI(data).then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <HeaderElement setType={setType} type={type} sub_pages={SUB_PAGES} />

      <Form />
      <Table selectRow={selectRow} orders={orders} />
    </>
  );
};
