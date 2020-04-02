import React from "react";
import styled from "styled-components";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const TableHead = ({ headerGroups }) => {
  return (
    <Head>
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => {
            // Add the sorting props to control sorting. For this example
            // we can add them into the header props
            console.log("column", column);

            return (
              <TableHeadInner
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaAngleDown />
                    ) : (
                      <FaAngleUp />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </TableHeadInner>
            );
          })}
        </TableRow>
      ))}
    </Head>
  );
};

export default TableHead;

const Head = styled.thead`
  background: white;
  color: #3f51b5;
  border-radius: 10rem;
`;

const TableHeadInner = styled.th`
  font-weight: 900;
  background: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  box-shadow: 2px 5px 5px 0px rgba(0, 0, 0, 0.1);
`;
const TableRow = styled.tr``;
