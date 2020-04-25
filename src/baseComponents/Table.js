import React, { useEffect, useState } from "react";
import ModularTable from "../components/table/ModularTable";
import styled from "styled-components";
import { Loader } from "../common/Loader";
import Popup from "../components/popup/Popup";
import ModularModal from "../components/modal/Modal";
import { Modal } from "./Modal";
import { Button } from "react-bootstrap";
import { Popup_ } from "./Popup_";
import { Empty } from "./Empty";
import { usePrevious } from "../functions/hooks.js/usePrevious";

const baseComponents = {
  Modal: Modal,
  Popup: Popup_,
  Empty: Empty,
};

export const Table = ({
  tableData,
  columns,
  middleware,
  clickRow,
  filterFuncStack,
  parseFuncStack,
  columnSelection,
  onChildUnmounts,
  minHeight,
}) => {
  const [ClickRowComponent, setClickRowComponent] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [preparedData, setPreparedData] = useState(null);

  let prevRowData = usePrevious(rowData);

  useEffect(() => {
    if (tableData) {
      var data = parse(filter(tableData));

      setPreparedData(data);
    }
  }, [tableData, filterFuncStack]);

  useEffect(() => {
    if (prevRowData && !rowData) {
      if (onChildUnmounts) onChildUnmounts();
    }
  }, [rowData]);

  const parse = (data) => {
    if (parseFuncStack) {
      parseFuncStack.forEach((parse_) => {
        data = parse_(data);
      });
    }
    return data;
  };

  const filter = (data) => {
    if (filterFuncStack) {
      filterFuncStack.forEach((filter_) => {
        data = filter_(data);
      });
    }
    return data;
  };

  const runClickRowMiddleware = (middlewareStack, data) => {
    if (middlewareStack.length === 0) return;
    const middleware = middlewareStack.pop();

    middleware(data);
    handleClick(data);
  };

  const handleClick = (rowData) => {
    if (middleware && middleware.length > 0) {
      runClickRowMiddleware(middleware, rowData);
    } else {
      const PopupChildren = clickRow.func(rowData, setRowData);

      setRowData(rowData);
      setClickRowComponent(PopupChildren);
    }
  };

  if (!preparedData || !columns) {
    return <Loader marginTop="5rem" time={1000} />;
  }

  if (ClickRowComponent) {
    var BaseComponent = baseComponents[ClickRowComponent.props.type];
  } else {
    var BaseComponent = null;
  }

  const filterColumns = () => {
    if (!columns || columns.length === 0 || !columnSelection) return columns;

    return columnSelection.map((column) => {
      return columns.find((column_) => column === column_.accessor);
    });
  };

  console.log("data", preparedData);
  console.log("columns", filterColumns());

  return (
    <>
      <Wrapper minHeight={minHeight}>
        <ModularTable
          data={preparedData}
          columns={filterColumns()}
          pagination={true}
          handleClick={handleClick}
        />
      </Wrapper>

      {ClickRowComponent && rowData && (
        <BaseComponent
          setValues={setRowData}
          values={rowData}
          {...ClickRowComponent.props}
        >
          {ClickRowComponent.children}
        </BaseComponent>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  min-height: 75vh;

  ${({ minHeight }) =>
    minHeight &&
    `
  min-height: ${minHeight}
  `}
`;
