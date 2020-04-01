import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table = props => {
  const {
    //user props
    handleClick,
    pagination,
    paginatonFunc,

    //table props
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { selectedRowIds, pageIndex, pageSize }
  } = props;

  return (
    <>
      <Table_ {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />

        <TableBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          handleClick={handleClick}
        />
      </Table_>

      {pagination && (
        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
        />
      )}
    </>
  );
};

export default Table;

const Table_ = styled.table`
  width: 90%;
  margin: 1rem auto;
  position: relative;

  font-weight: 500;
  border-radius: 1rem;
  border: 0.5px solid #eee;
  overflow: hidden;
  box-shadow: -5px 5px 16px 0px rgba(0, 0, 0, 0.1);
`;
