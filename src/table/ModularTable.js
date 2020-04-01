import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {
  useTable,
  usePagination
  // useFilters,
  // useSortBy,
  // useExpanded,
} from "react-table";

import Table from "./Table";

import { IndeterminateCheckbox } from "./Checkbox";

import {
  useRowSelect,
  useSortBy
} from "react-table/dist/react-table.development";

const ModularTable = props => {
  const { data, columns, paginatonFunc, rowSelection } = props;
  const tableProps = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    useRowSelect,
    usePagination,
    hooks => {
      rowSelection &&
        hooks.visibleColumns.push(columns => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
          ...columns
        ]);
    }
  );

  useEffect(() => {
    if (!paginatonFunc) return;
    paginatonFunc({
      selectedIds: tableProps.selectedRowIds,
      selectedRows: tableProps.selectedFlatRows
    });
  }, [tableProps.selectedRowIds]);

  return <Table {...tableProps} {...props} />;
};

export default ModularTable;

ModularTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  pagination: PropTypes.bool,
  paginatonFunc: PropTypes.func,
  rowSelection: PropTypes.bool,
  handleClick: PropTypes.func
};
