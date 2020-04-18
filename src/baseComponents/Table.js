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

const baseComponents = {
  Modal: Modal,
  Popup: Popup_,
  Empty: Empty,
};

export const Table = ({
  tableData,
  columnsArr,
  middleware,
  clickRow,
  filterFuncStack,
  parseFuncStack,
}) => {
  const [columns, setColumns] = useState(null);
  const [ClickRowComponent, setClickRowComponent] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [preparedData, setPrepareData] = useState(null);

  useEffect(() => {
    if (columnsArr && columnsArr.length > 0) _parseColumns();
  }, [columnsArr]);

  useEffect(() => {
    if (tableData) {
      var data = parse(filter(tableData));

      setPrepareData(data);
    }
  }, [tableData]);

  const _parseColumns = () => {
    if (columnsArr[0].accessor) {
      var columns_ = columnsArr;
    } else {
      var columns_ = [];
      columnsArr.forEach((column) => {
        if (column && column.length > 0 && column[0] !== "__typename") {
          columns_.push({
            Header: column[0],
            accessor: column[1],
          });
        }
      });
    }

    setColumns(columns_);
  };

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

  if (!columns) {
    return <h1>Keine Daten vorhanden</h1>;
  }

  if (!preparedData || !columns) {
    return <Loader marginTop="5rem" time={1000} />;
  }

  if (ClickRowComponent) {
    var BaseComponent = baseComponents[clickRow.baseComponent.type];
  } else {
    var BaseComponent = null;
  }

  return (
    <>
      <Wrapper>
        {tableData && tableData.length == 0 && <h1>Keine Daten vorhanden</h1>}
        <ModularTable
          data={preparedData}
          columns={columns}
          pagination={true}
          handleClick={handleClick}
        />
      </Wrapper>

      {ClickRowComponent && rowData && (
        <BaseComponent
          submitFunc={clickRow.baseComponent.submitFunc}
          setValues={setRowData}
          setClickRowComponent={setClickRowComponent}
          values={rowData}
          settings={clickRow.baseComponent.settings}
          headline={clickRow.baseComponent.headline}
          btnList={clickRow.baseComponent.btnList}
          header={ClickRowComponent.header}
          btnList={ClickRowComponent.btnList}
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
`;
