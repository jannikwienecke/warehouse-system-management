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

export const useGraphqlApi = (dataType, options, parameter_) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [arrInput, setArrInput] = useState(null);
  const [parameter, setParameter] = useState(parameter_);
  const currentSchema = useSelector((state) => state.base.currentSchema);

  const query = useQueryBuilder([{ modelName: dataType, parameter }], "get");

  const { data, error, refetch } = useQuery(query, {
    options,
    onError: (err) =>
      createErrListFromApiError(error, dispatch, "useGraphqlApi Fetching"),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && dataType in data) {
      extractNameValuesFromObjects();
      setTableData(data[dataType]);
      setArrInput(getArrInput(dataType, sizeFields, currentSchema));
    }
  }, [data]);

  useEffect(() => {
    if (dataType && currentSchema) {
      setTableData([]);
      setTableColumns([]);
      fetchData(parameter_);
    }
  }, [dataType, currentSchema]);

  useEffect(() => {
    if (tableData.length > 0) setTableColumns(getTableColumns());
  }, [tableData]);

  const extractNameValuesFromObjects = () => {
    data[dataType].forEach((data) => {
      Object.keys(data).forEach((name) => {
        let val = data[name];
        if (typeof val !== "object") {
          if (typeof val === "boolean") {
            data[name] = val ? "Ja" : "Nein";
          }
          return;
        }
        if (!val || (val && !val.name)) return;

        if (name.slice(-5) === "_name") {
          return;
        }
        data[name + "_name"] = val.name;
      });
    });
  };

  const fetchData = (parameter) => {
    if (!dataType) {
      console.log("Missing Datatype");
      return;
    }
    parameter = _parseParameter(parameter, dataType, currentSchema);
    setParameter(parameter);
  };

  const getTableColumns = () => {
    let columnFields = currentSchema[dataType].fields;
    let columns = [];
    columnFields.forEach((column) => {
      let nameColumn = column.name;
      let result = getTypeColumnBySchema(column.name, columnFields);
      let type = result[0];
      if (type === "object") {
        if (column.name.slice(-5) !== "_name") {
          nameColumn = nameColumn + "_name";
        }
      }
      if (
        ["createdAt", "createdBy"].includes(column.name) ||
        column.name.slice(-3) === "Set"
      )
        return null;
      columns.push([translate(nameColumn), nameColumn]);
    });

    return _parseColumns(columns);
  };

  return { arrInput, tableColumns, tableData, fetchData, refetch, data, error };
};
