import React, { useState, useEffect } from "react";

import { HeaderElement } from "../common/HeaderElement";
import { Form } from "../baseComponents/Form";
import { Table } from "../baseComponents/Table";
import { useSelector, useDispatch } from "react-redux";
import { EXCEPTIONS } from "./base";
import { copy } from "../functions/utils";
import { Loader } from "../common/Loader";

const traceDataName = (state, toFind, traceKeys) => {
  if (!state || typeof state !== "object" || state.length) {
    traceKeys = [];
    return;
  }

  var keys = Object.keys(state, keys);
  var found = false;

  if (keys.includes(toFind)) {
    EXCEPTIONS.BreakException = { trace: [...traceKeys] };
    throw EXCEPTIONS.BreakException;
  }

  keys.forEach((key) => {
    var sub_state = state[key];
    traceDataName(sub_state, toFind, [...traceKeys, key]);
  });
};

const getDataByTrace = (state, dataName, trace) => {
  var sub_state = null;
  trace.forEach((key) => {
    sub_state = state[key];
  });
  return sub_state[dataName];
};

const setStateByKeyName = (state, dataName) => {
  try {
    traceDataName(state, dataName, []);
    return null;
  } catch (e) {
    if (e === EXCEPTIONS.BreakException) {
      return getDataByTrace(state, dataName, e.trace);
    } else {
      throw e;
    }
  }
};

export const Parent = (props) => {
  const { setType, type, sub_pages } = props;
  const [selectedRow, selectRow] = useState(null);
  const [apiRequest, setApiRequest] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const dispatch = useDispatch();

  const tableData = useSelector((state) =>
    setStateByKeyName(state, props.table.dataName)
  );

  useEffect(() => {
    if (apiRequest) makeApiRequest();
  }, [apiRequest]);

  useEffect(() => {
    runInitFunctions();
  }, []);

  useEffect(() => {
    if (tableData) {
      setLoading(false);
    }
  }, tableData);

  const runInitFunctions = () => {
    Object.keys(props).forEach((componentName) => {
      const component = props[componentName];

      if (component.initFunc) {
        component.initFunc(dispatch);
      }
    });
  };

  const makeApiRequest = () => {
    console.log(`${props.name}: MOCK API REQUEST - ${apiRequest}`);

    setLoading(true);
    props.formApiRequest(apiRequest);
  };

  return (
    <>
      <HeaderElement setType={setType} type={type} sub_pages={sub_pages} />

      <Form
        {...props.form}
        isLoading={isLoading}
        setApiRequest={setApiRequest}
        setLoading={setFormLoading}
      />

      {/* <Table {...props.table} tableData={tableData} /> */}
      {!formLoading && <Table {...props.table} tableData={tableData} />}

      {formLoading && <Loader marginTop="5rem" />}
    </>
  );
};
