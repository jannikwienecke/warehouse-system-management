import React from "react";
import styled from "styled-components";

const Pagination = ({
  gotoPage,
  previousPage,
  nextPage,
  onChange,
  canPreviousPage,
  pageOptions,
  pageSize,
  pageIndex,
  canNextPage,
  pageCount,
  setPageSize,
}) => {
  return (
    <PaginationWrapper>
      <PageNumber>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </PageNumber>
      <PageControl>
        <ControlBtn onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </ControlBtn>{" "}
        <ControlBtn onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </ControlBtn>{" "}
        <ControlBtn onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </ControlBtn>{" "}
        <ControlBtn
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </ControlBtn>
      </PageControl>{" "}
      <PageGoto>
        <PageInput
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px" }}
        />
        <PageSelect
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </PageSelect>
      </PageGoto>
    </PaginationWrapper>
  );
};
export default Pagination;

export const PaginationWrapper = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100%;
`;

export const PageNumber = styled.div`
  width: 30%;
`;

export const PageControl = styled.div`
  width: 30%;
`;
export const PageGoto = styled.div`
  width: 33%;
`;

const ControlBtn = styled.button`
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  font-weight: 500;

  :hover {
    cursor: pointer;
    border: 1px solid #3f51b5;
  }
`;

const PageSelect = styled.select`
  font-weight: 500;

  padding: 0.4rem;
  border-radius: 0.4rem;
  border: 0.04rem solid #cecece;

  :hover {
    cursor: pointer;
    border: 1px solid #3f51b5;
  }
`;

const PageInput = styled.input`
  width: 30%;
  font-size: 1rem;
  padding: 0.3rem;
  margin-right: 1rem;
  color: #444;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  border-radius: 0.4rem;
  border: 0.04rem solid #cecece;
  background-color: transparent;
  color: #343434;

  :hover {
    border: 0.1rem solid #3f51b5;
  }

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #888;
    opacity: 0.7;
`;
