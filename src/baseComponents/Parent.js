import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HeaderElement } from "../common/HeaderElement";
import { Form } from "../baseComponents/Form";
import { Table } from "../baseComponents/Table";
import { useSelector, useDispatch } from "react-redux";
import { EXCEPTIONS } from "./base";
import { copy, traceDataName, getDataByTrace } from "../functions/utils";
import { Loader } from "../common/Loader";

const setStateByKeyName = (state, component) => {
  if (!component || !component.dataName) return false;
  try {
    traceDataName(state, component.dataName, []);
    return null;
  } catch (e) {
    if (e === EXCEPTIONS.BreakException) {
      return getDataByTrace(state, component.dataName, e.trace);
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
    setStateByKeyName(state, props.table)
  );

  useEffect(() => {
    runInitFunctions();
  }, []);

  useEffect(() => {
    if (apiRequest) makeApiRequest();
  }, [apiRequest]);

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
      {props.header && (
        <HeaderElement
          setType={props.header.setType}
          type={props.header.type}
          sub_pages={props.header.sub_pages}
        />
      )}

      {props.form && (
        <Form
          {...props.form}
          isLoading={formLoading}
          setApiRequest={setApiRequest}
          setLoading={setFormLoading}
        />
      )}

      {!formLoading && props.table && (
        <Table {...props.table} tableData={tableData} />
      )}

      {formLoading && <Loader marginTop="5rem" />}

      {!formLoading && props.children}
    </>
  );
};

Parent.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  setType: PropTypes.func.isRequired,
  sub_pages: PropTypes.arrayOf(PropTypes.string),
  table: PropTypes.shape({
    columnArr: PropTypes.array.isRequired,
    dataName: PropTypes.string.isRequired,
    initFunc: PropTypes.func.isRequired,
  }),

  form: PropTypes.shape({
    title: PropTypes.string.isRequired,
    arrInput: PropTypes.array.isRequired,
    middlewareValidation: PropTypes.arrayOf(PropTypes.func),
    middlewareParse: PropTypes.arrayOf(PropTypes.func),
    apiFunc: PropTypes.func.isRequired,
  }),
};
