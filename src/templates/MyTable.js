import React from "react";
import ModularTable from "../components/table/ModularTable";
import { data, columns } from "../components/table/data";

const MyTable = () => {
  return (
    <ModularTable
      data={data}
      columns={columns}
      paginatonFunc={data => console.log(data)}
      pagination={true}
      rowSelection={true}
      handleClick={rowData => console.log(rowData)}
    />
  );
};

export default MyTable;
