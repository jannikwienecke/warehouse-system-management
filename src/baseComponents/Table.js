import React, { useEffect, useState } from "react";
import ModularTable from "../components/table/ModularTable";
import styled from "styled-components";
import { Loader } from "../common/Loader";

export const Table = ({ tableData, columnsArr }) => {
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    _parseColumns();
  }, [columnsArr]);

  const _parseColumns = () => {
    const columns_ = [];
    columnsArr.forEach((column) => {
      columns_.push({
        Header: column[0],
        accessor: column[1],
      });
    });
    setColumns(columns_);
  };

  if (!tableData) {
    return <Loader marginTop="5rem" />;
  }

  return (
    <Wrapper>
      {tableData && tableData.length == 0 && <h1>Keine Daten vorhanden</h1>}
      <ModularTable
        data={tableData}
        columns={columns}
        pagination={true}
        // handleClick={(rowData) => selectRow(rowData.original)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
`;
