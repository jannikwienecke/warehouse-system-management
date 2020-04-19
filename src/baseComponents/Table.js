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
  // columnsArr,
  columns,
  middleware,
  clickRow,
  filterFuncStack,
  parseFuncStack,
}) => {
  const [ClickRowComponent, setClickRowComponent] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [preparedData, setPreparedData] = useState(null);

  useEffect(() => {
    if (tableData) {
      var data = parse(filter(tableData));

      setPreparedData(data);
    }
  }, [tableData]);

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

  return (
    <>
      <Wrapper>
        <ModularTable
          data={preparedData}
          columns={columns}
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
`;
