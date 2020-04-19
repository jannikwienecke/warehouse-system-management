import { useState, useEffect } from "react";
import {
  translate,
  createErrListFromApiError,
  getTypeColumnBySchema,
} from "../functions/utils";
import { queryBuilder } from "../queries/queryBuilder";
import { useQuery } from "react-apollo";
import { nullQuery } from "../queries/queries";
import { useDispatch, useSelector } from "react-redux";
import { getArrInput, _parseParameter } from "./helperUseGraphql";

export const useGraphqlApi = (dataType, sizeFields = 6) => {
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
    if (tableData.length > 0 && tableColumns.length === 0) {
      setTableColumns(getTableColumns());
    }
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
    let columnFields = currentSchema[dataType].fields;
    return columnFields.map((column) => {
      let type = getTypeColumnBySchema(column.name, columnFields);
      if (type === "object") return null;

      return [translate(column.name), column.name];
    });
  };

  return { arrInput, tableColumns, tableData, fetchData };
};
