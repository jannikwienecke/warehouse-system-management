import { useState, useEffect } from "react";
import {
  translate,
  createErrListFromApiError,
  getTypeColumnBySchema,
  _parseColumns,
} from "../utils";
import { useQueryBuilder } from "./useQueryBuilder";
import { useQuery } from "react-apollo";
import { nullQuery } from "../../queries";
import { useDispatch, useSelector } from "react-redux";
import {
  getArrInput,
  _parseParameter,
} from "../../wareBaseData/helperUseGraphql";

const sizeFields = 6;

export const useGraphqlApi = (dataType, options) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [arrInput, setArrInput] = useState(null);
  const [parameter, setParameter] = useState(null);
  // const [parameter, setParameter] = useState(options && options.parameter);
  const currentSchema = useSelector((state) => state.base.currentSchema);
  const query = useQueryBuilder([{ modelName: dataType, parameter }], "get");

  const { data, error } = useQuery(query, {
    options,
    onError: (err) =>
      createErrListFromApiError(error, dispatch, "useGraphqlApi Fetching"),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && dataType in data) {
      setTableData(data[dataType]);
      setArrInput(getArrInput(dataType, sizeFields, currentSchema));
    }
  }, [data]);

  useEffect(() => {
    if (dataType && currentSchema) {
      setTableData([]);
      setTableColumns([]);
      fetchData();
    }
  }, [dataType, currentSchema]);

  useEffect(() => {
    if (tableData.length > 0) setTableColumns(getTableColumns());
  }, [tableData]);

  const fetchData = (parameter) => {
    console.log("para", parameter);

    parameter = _parseParameter(parameter, dataType, currentSchema);

    setParameter(parameter);
  };

  const getTableColumns = () => {
    let columnFields = currentSchema[dataType].fields;
    let columns = [];
    columnFields.forEach((column) => {
      let result = getTypeColumnBySchema(column.name, columnFields);
      let type = result[0];
      if (type === "object") return null;

      columns.push([translate(column.name), column.name]);
    });
    return _parseColumns(columns);
  };

  return { arrInput, tableColumns, tableData, fetchData };
};
