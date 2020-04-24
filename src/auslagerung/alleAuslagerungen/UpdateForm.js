import React, { useState, useEffect } from "react";
import {
  ListWrapper,
  ButtonWrapper,
} from "../../wareBaseData/StylesDetailView";
import { MyButton } from "../../components/button/MyButton";
import { ValidateDeleteModal } from "../../wareBaseData/ValidateDeleteModal";
import ModularForm from "../../components/form/ModularForm";
import { parseArrInput, isQuery } from "../../functions/utils";
import { useUpdate } from "../../functions/hooks.js/useUpdate";
import { useSelector } from "react-redux";

export const UpdateForm = (props) => {
  const { setValues, setRow, dataType, arrInput, values } = props;
  const [updateParameter, setUpdateParamter] = useState();
  const [validateDelete, setValidateDelete] = useState(null);
  const [formHasError, setFormHasError] = useState(null);
  const rows = useSelector((state) => state.base.rows);

  const [mutationParammeter, setMutationParameter] = useState({
    idsToUpdate: values.id,
    dataType,
  });

  const { updateElement, query, errorParameter } = useUpdate(
    mutationParammeter
  );

  useEffect(() => {
    if (isQuery(query)) {
      updateElement();
    }
  }, [query]);

  const onCompleted = () => {
    setRow(null);
    setValues(null);
  };

  const runMutation = (parameter, type) => {
    const id = parseInt(values["id"]);
    const queryList = [
      {
        modelName: dataType,
        parameter: { id, ...parameter },
      },
    ];
    setMutationParameter({
      ...mutationParammeter,
      type,
      queryList,
      onCompleted,
    });
  };

  const runDelete = () => {
    runMutation({}, "delete");
  };

  const runUpdate = () => {
    runMutation(updateParameter, "put");
  };

  const validate = (parameter) => {
    const productIsInCurrentRow = () => {
      if (parameter.rows.id) {
        let currentRow = rows.find((row) => row.id === parameter.rows.id);
        if (currentRow.product.id !== parameter.products.id) {
          return false;
        } else {
          return true;
        }
      }
    };

    const findRowContainsProduct = () => {
      return rows.find((row) => row.product.id === parameter.products.id);
    };

    const updateParameter = (row) => {
      if (!row) parameter.rows = {};
      else {
        parameter.rows = {
          id: row.id,
          name: row.name,
        };
      }
      return parameter;
    };
    const validateQuantity = () => {
      let row = rows.find((row) => row.id === parameter.rows.id);
      if (parameter.quantity > row.stock) {
        setFormHasError(true);
      } else {
        if (formHasError) setFormHasError(false);
      }
    };

    if (!productIsInCurrentRow()) {
      let row = findRowContainsProduct();
      parameter = updateParameter(row);
    }

    validateQuantity();

    setUpdateParamter(parameter);
  };

  const setOptionsProducts = () => {
    let productIds = {};
    let options = [];
    rows.forEach((row) => {
      if (!(row.product.id in productIds)) {
        options.push(row.product);
        productIds[row.product.id] = true;
      }
    });
    return options;
  };

  const setOptionsRows = () => {
    let opt = rows.filter((option) => {
      if (updateParameter) {
        return option.product.id === updateParameter.products.id;
      } else {
        return option.product.id === values.product.id;
      }
    });
    return opt;
  };

  const parseArrInputSpecial = () => {
    const filterInputElements = () => {
      let selectedInputs = [
        "employees",
        "products",
        "rows",
        "notes",
        "quantity",
      ];
      arrInput_ = arrInput.filter((input) =>
        selectedInputs.includes(input.name)
      );
    };

    const filterInputOptions = () => {
      arrInput_.forEach((input) => {
        if (input.name === "rows") {
          input.setOptions = setOptionsRows;
        } else if (input.name === "products") {
          input.setOptions = setOptionsProducts;
        }
      });
    };
    const setMaxQuantity = () => {
      let row = rows.find((row) => row.id === values.row.id);
      arrInput_.forEach((input) => {
        if (input.name === "quantity") input.max = row.stock;
      });
    };

    let arrInput_;
    filterInputElements();
    filterInputOptions();
    setMaxQuantity();
    return arrInput_;
  };

  return (
    <>
      <ValidateDeleteModal
        show={validateDelete}
        close={() => setValidateDelete(false)}
        submit={runDelete}
      />
      <ListWrapper>
        <ModularForm
          fullSize={true}
          arrInput={parseArrInput(parseArrInputSpecial(), values, dataType)}
          submitFunc={validate}
          requiredArguments={["all"]}
        />
      </ListWrapper>

      <ButtonWrapper>
        <MyButton color="#4caf50" onClick={!formHasError && runUpdate}>
          Speichern
        </MyButton>
        <MyButton onClick={() => setValidateDelete(true)}>Löschen</MyButton>
      </ButtonWrapper>
    </>
  );
};
