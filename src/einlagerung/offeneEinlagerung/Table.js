import React from "react";
import ModularTable from "../../components/table/ModularTable";
import styled from "styled-components";
import { columns } from "./data";

export const Table = ({ selectRow, openOrders }) => {
  return (
    <Wrapper>
      {!openOrders ? (
        <></>
      ) : (
        <>
          {openOrders && openOrders.length == 0 && (
            <h1>Keine Offenen Einlagerungen</h1>
          )}

          <ModularTable
            data={openOrders}
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
