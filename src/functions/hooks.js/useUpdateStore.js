import { useDispatch } from "react-redux";
import { useQueryBuilder } from "./useQueryBuilder";
import { setInitData } from "../../baseComponents/store/actions";

export const useUpdateStore = (dataType) => {
  const dispatch = useDispatch();

  const GET_ALL_ELEMENTS = useQueryBuilder([{ modelName: dataType }], "get");

  const updateStore = (cache, data, parameter) => {
    const response = cache.readQuery({ query: GET_ALL_ELEMENTS });
    const fetchElements = data[Object.keys(data)[0]];
    const _add = () => {
      return response[dataType].concat([fetchElements]);
    };
    const _update = () => {
      return response[dataType].map((data) => {
        if (parseInt(data.id) == parameter.id) {
          return fetchElements;
        } else {
          return data;
        }
      });
    };
    const _delete = () => {
      return response[dataType].filter(
        (data) => parseInt(data.id) !== parseInt(parameter.id)
      );
    };

    const writeChanges = (data_) => {
      const writeRedux = () => {
        dispatch(
          setInitData({
            [dataType]: data_,
          })
        );
      };
      const writeApollo = () => {
        cache.writeQuery({
          query: GET_ALL_ELEMENTS,
          data: { [dataType]: data_ },
        });
      };
      writeRedux();
      writeApollo();
    };

    const dict_func = {
      put: _update,
      delete: _delete,
      post: _add,
    };

    if (typeof parameter.id === "object") {
      var idList = parameter.id.map((id) => id);
      idList.forEach((id) => {
        parameter.id = id;
        var data_ = dict_func[parameter.action]();
        writeChanges(data_);
      });
    } else {
      var data_ = dict_func[parameter.action]();
      writeChanges(data_);
    }
  };

  return updateStore;
};
