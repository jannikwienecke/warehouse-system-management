import React from "react";
import ModularTable from "../../components/table/ModularTable";
import styled from "styled-components";
import { columns } from "./data";

export const Table = ({ selectRow, orders }) => {
  return (
    <Wrapper>
      {!orders ? (
        <></>
      ) : (
        <>
          {orders && orders.length == 0 && <h1>Keine Einlagerungen</h1>}

          <ModularTable
            data={orders}
            columns={columns}
            pagination={true}
            handleClick={(rowData) => selectRow(rowData.original)}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
`;
