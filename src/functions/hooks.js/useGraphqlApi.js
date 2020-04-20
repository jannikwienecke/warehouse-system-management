import { useState, useEffect } from "react";
import {
  translate,
  createErrListFromApiError,
  getTypeColumnBySchema,
  _parseColumns,
} from "../utils";
import { queryBuilder } from "../../queries/queryBuilder";
import { useQuery } from "react-apollo";
import { nullQuery } from "../../queries/queries";
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
  const [query, setQuery] = useState({ query: nullQuery });

  const currentSchema = useSelector((state) => state.base.currentSchema);

  const { data, error } = useQuery(query.query, {
    ...query.options,
    onError: (err) =>
      createErrListFromApiError(error, dispatch, "useGraphqlApi Fetching"),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setTableData(data[dataType]);
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
    // if (tableData.length > 0 && tableColumns.length === 0) {
    setTableColumns(getTableColumns());
    // }
  }, [tableData]);

  useEffect(() => {
    if (tableColumns.length > 0) {
      setArrInput(getArrInput(dataType, sizeFields, currentSchema));
    }
  }, [tableColumns]);

  const fetchData = async (parameter) => {
    parameter = _parseParameter(parameter, dataType, currentSchema);

    const query_ = queryBuilder(
      [{ modelName: dataType, parameter }],
      "get",
      currentSchema
    );
    setQuery({ query: query_ });
  };

  const getTableColumns = () => {
    // console.log("data", dataType);

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
