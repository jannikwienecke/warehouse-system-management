import React, { useState } from "react";
import { Parent } from "../../baseComponents/Parent";
import { extractIdentifier } from "../../functions/middleware";
import { INPUT, INPUT_DEFAULTS } from "../../baseComponents/base";
import { setArrInputSize, translate } from "../../functions/utils";
import FormCard from "../../components/form/FormCard";
import ModularForm from "../../components/form/ModularForm";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";

let inputQuantity = INPUT_DEFAULTS.int;
inputQuantity.name = "quantity";

export const OrderForm = ({ delivery, setDelivery }) => {
  const addOrderElement = (data) => {
    const newOrder = {
      id: delivery ? delivery.length + 1 : 1,
      packagingId: data.products.packaging.id,
      packagingName: data.products.packaging.name,
      productName: data.products.name,
      productId: data.products.id,
      quantity: data.quantity,
      factoryId: data.symbuildings.symfactory.id,
      factoryName: data.symbuildings.symfactory.name,
      buildingId: data.symbuildings.id,
      buildingName: data.symbuildings.name,
    };

    if (delivery) {
      // console.log("add to deliver", newOrder);

      setDelivery([...delivery, newOrder]);
    } else {
      // console.log("NEW ORDER= ", newOrder);

      setDelivery([newOrder]);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Form submit={addOrderElement} />
    </div>
  );
};

export const Form = (props) => {
  const arrInput = useCombinedArrInput();
  const [formData, setFormData] = useState(null);

  if (!arrInput) return null;
  arrInput.push(inputQuantity);
  return (
    <div>
      <FormCard width={90} marginTopMargin={2} color="#e3e3e3">
        <ModularForm
          {...props}
          colorScheme="grey"
          headline={`Position hinzufügen`}
          arrInput={arrInput}
          submitFunc={(values) => setFormData(values)}
          arrBtns={{
            btns: [
              {
                size: "md",
                variant: "dark",
                text: "Hinzufügen",
                func: () => props.submit(formData),
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
