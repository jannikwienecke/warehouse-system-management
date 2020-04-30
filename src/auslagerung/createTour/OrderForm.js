import React, { useState, useEffect } from "react";
import { Parent } from "../../baseComponents/Parent";
import { extractIdentifier } from "../../functions/middleware";
import { INPUT, INPUT_DEFAULTS } from "../../baseComponents/base";
import { setArrInputSize, translate } from "../../functions/utils";
import FormCard from "../../components/form/FormCard";
import ModularForm from "../../components/form/ModularForm";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { useSelector } from "react-redux";

let inputQuantity = INPUT_DEFAULTS.int;
inputQuantity.name = "quantity";

export const OrderForm = ({ delivery, setDelivery }) => {
  const [formHasError, setFormHasError] = useState(null);
  const addOrderElement = (data) => {
    if (data.quantity <= 0) return;
    const newOrder = {
      id: delivery ? delivery.length + 1 : 1,
      packagingId: data.products.packaging.id,
      packagingName: data.products.packaging.name,
      width: data.products.packaging.width,
      length: data.products.packaging.length,
      productName: data.products.name,
      productId: data.products.id,
      threeInRow: data.products.threeInRow,
      quantity: data.quantity,
      factoryId: data.symbuildings.symfactory.id,
      factoryName: data.symbuildings.symfactory.name,
      buildingId: data.symbuildings.id,
      buildingName: data.symbuildings.name,
      rowId: data.rows.id,
      rowName: data.rows.name,
    };

    if (delivery) {
      setDelivery([...delivery, newOrder]);
    } else {
      setDelivery([newOrder]);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Form
        submit={addOrderElement}
        setError={setFormHasError}
        hasError={formHasError}
        delivery={delivery}
      />
    </div>
  );
};

export const Form = (props) => {
  const rows = useSelector((state) => state.base.rows);
  const products = useSelector((state) => state.base.products);
  const arrInput = useCombinedArrInput();
  const [formData, setFormData] = useState(null);
  const [missingInput, setMissingInput] = useState(null);

  useEffect(() => {
    validate(formData);
  }, [props.delivery]);

  const setOptionsProducts = () => {
    let productIds = {};
    let options = [];
    rows.forEach((row) => {
      if (row.product && !(row.product.id in productIds)) {
        const productId = row.product.id;
        options.push(products.find((product) => product.id === productId));
        productIds[productId] = true;
      }
    });
    return options;
  };

  const getQuantityProductDelivery = (row) => {
    let quantity = 0;
    if (!props.delivery) return quantity;
    props.delivery.forEach((order) => {
      if (!row.product || row.product.id !== order.productId) return;
      if (order.rowId !== row.id) return;
      quantity += order.quantity;
    });
    return quantity;
  };

  const setOptionsRows = () => {
    return rows.filter((option) => {
      if (!option.product || !formData || !formData.products) return;
      if (option.product.id === formData.products.id) {
        const quantityProductDelivery = getQuantityProductDelivery(option);
        const tempStock = option.stock - quantityProductDelivery;
        if (tempStock <= 0) return;
        return true;
      }
    });
  };

  const validateSubmit = () => {
    const setMissingParameter = () => {
      Object.keys(formData).forEach((key) => {
        if (formData[key] === undefined) {
          missingInput_.push(key);
        }
      });
      setMissingInput(missingInput_);
    };

    let missingInput_ = [];
    setMissingParameter();
    if (missingInput_.length > 0) {
      return;
    }
    props.submit(formData);
  };

  const validate = (parameter) => {
    if (!parameter) return;
    const productIsInCurrentRow = () => {
      if (parameter.rows && parameter.rows.id) {
        let currentRow = rows.find((row) => row.id === parameter.rows.id);

        if (currentRow && currentRow.product.id === parameter.products.id) {
          const hasProductInStock =
            currentRow.stock - getQuantityProductDelivery(currentRow);
          if (hasProductInStock) return true;
        }
        let row = findRowContainsProduct();
        updateParameter(row);
      }
    };

    const findRowContainsProduct = () => {
      return rows.find((row) => {
        if (row.product && row.product.id !== parameter.products.id)
          return false;

        const hasProductInStock = row.stock - getQuantityProductDelivery(row);
        if (hasProductInStock) return true;
      });
    };

    const updateParameter = (row) => {
      if (!row) parameter.rows = { id: -1, name: "Produkt nicht auf Lager" };
      else {
        parameter.rows = {
          id: row.id,
          name: row.name,
        };
      }
    };

    const validateQunatity = () => {
      if (!parameter.rows) return;
      let row = rows.find((row) => row.id === parameter.rows.id);
      if (row && parameter.quantity > row.stock) {
        props.setError(true);
      } else {
        props.setError(false);
      }
    };

    productIsInCurrentRow();

    validateQunatity();
    setFormData(parameter);
  };

  const parseArrInputSpecial = () => {
    const filterInputOptions = () => {
      arrInput.forEach((input) => {
        if (input.name === "rows") {
          input.setOptions = setOptionsRows;
        } else if (input.name === "products") {
          input.setOptions = setOptionsProducts;
        }
      });
    };
    const setMaxQuantity = () => {
      if (!formData || !formData.rows) return;

      let row = rows.find((row) => row.id === formData.rows.id);
      if (!row) return;
      arrInput.forEach((input) => {
        if (input.name === "quantity")
          input.max = row.stock - getQuantityProductDelivery(row);
      });
    };

    const setInputError = () => {
      arrInput.forEach((input) => {
        input["error"] = { nameList: missingInput };
      });
    };

    let arrInput_;
    filterInputOptions();
    setMaxQuantity();
    setInputError();

    return arrInput;
  };

  if (!arrInput) return null;
  arrInput.push(inputQuantity);
  return (
    <div>
      <FormCard width={90} marginTopMargin={2} color="#e3e3e3">
        <ModularForm
          {...props}
          colorScheme="grey"
          headline={`Position hinzufügen`}
          arrInput={parseArrInputSpecial()}
          submitFunc={(values) => validate(values)}
          arrBtns={{
            btns: [
              {
                size: "md",
                variant: "dark",
                text: "Hinzufügen",
                func: () =>
                  !props.hasError && formData && validateSubmit(formData),
              },
            ],

            justifyContent: "flex-end",
            position: "top",
          }}
        />
      </FormCard>{" "}
    </div>
  );
};

const useCombinedArrInput = () => {
  const productData = useGraphqlApi("products");
  const buildingData = useGraphqlApi("symbuildings");
  const rowData = useGraphqlApi("rows");

  const combineArrInputs = (listModelData, inputSelection) => {
    if (!listModelData[0].arrInput) return;
    let arrInput = [];
    let nameCounter = {};
    listModelData.forEach((modelData) => {
      if (inputSelection) {
        modelData.arrInput = modelData.arrInput.filter((input) => {
          if (!(input.name in nameCounter)) {
            nameCounter[input.name] = true;
            return inputSelection.includes(input.name);
          }
        });
      }
      arrInput.push(...modelData.arrInput);
    });
    return arrInput;
  };

  let inputSelection = ["products", "rows", "symbuildings", "quantity"];
  const arrInput = combineArrInputs(
    [productData, buildingData, rowData],
    inputSelection
  );

  return arrInput;
};
