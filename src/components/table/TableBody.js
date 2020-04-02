import React from "react";
import styled from "styled-components";

const TableBody = ({ getTableBodyProps, prepareRow, page, handleClick }) => {
  const handleClick_ = rowData => {
    if (handleClick) {
      handleClick(rowData);
    }
  };

  return (
    <tbody {...getTableBodyProps()}>
      {page.map(row => {
        prepareRow(row);
        return (
          <TableRow onClick={() => handleClick_(row)} {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <TableData {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </TableData>
              );
            })}
          </TableRow>
        );
      })}
    </tbody>
  );
};

export default TableBody;

const TableData = styled.td`
  padding: 10px;

  border-bottom: 0.005rem solid #eee;
`;

const TableRow = styled.tr`
  &:nth-child(2n) {
    background-color: #fafafa;
  }
`;
