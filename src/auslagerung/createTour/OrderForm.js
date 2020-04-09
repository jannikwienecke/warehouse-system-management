import React from "react";
import { Parent } from "../../baseComponents/Parent";
import { extractIdentifier } from "../../functions/middleware";
import { INPUT } from "../../baseComponents/base";
import { setArrInputSize } from "../../functions/utils";

export const OrderForm = ({ delivery, setDelivery }) => {
  const addOrderElement = (data) => {
    const newOrder = {
      id: delivery ? delivery.length + 1 : 1,
      type: data.products.type,
      product_name: data.products.product_name,
      product_id: data.product_id,
      quantity: parseInt(data.quantity),
      factory: data.symBuildings.symFactory_id,
      building: data.symBuildings.symBuilding_name,
    };

    if (delivery) {
      setDelivery([...delivery, newOrder]);
    } else {
      setDelivery([newOrder]);
    }
  };

  const getArrInput = () => {
    const arrInput = [INPUT.products, INPUT.symBuildings, INPUT.quantity];
    setArrInputSize(arrInput, 4);
    return arrInput;
  };

  return (
    <>
      <Parent
        form={{
          formTitle: "Auftrag hinzufügen",
          arrInput: getArrInput(),
          middlewareValidation: [],
          middlewareParse: [extractIdentifier],
          requiredArguments: [],
          cardWrapper: true,
          btnText: "Hinzufügen",
          apiFunc: (dispatch, parameter) => addOrderElement(parameter),
        }}
      />
    </>
  );
};
