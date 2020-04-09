import React, { useState, useEffect } from "react";
import "./styles.css";
import Paletts from "./Pallets";
import {TABLE_VIEW } from "./data";
import { EURO, INDUSTRY } from "./constants";
import { copy } from "./helper";
import { extractIdentifier } from "../../functions/middleware";
import { INPUT } from "../../baseComponents/base";
import { OrderForm } from "./OrderForm";
import { Control } from "./Control";

export default function CreateTour() {
  const [delivery, setDelivery] = useState(null);
  const [counter, incrCounter] = useState(0);
  const [rerender, setRerender] = useState();
  const [view, setView] = useState(TABLE_VIEW);

  return (
    <div>
      <OrderForm delivery={delivery} setDelivery={setDelivery} />

      <Control
        setDelivery={setDelivery}
        delivery={delivery}
        incrCounter={incrCounter}
        counter={counter}
        setView={setView}
        view={view}
      />

      {delivery && <Paletts delivery={delivery} view={view} />}

      {/* {delivery.length > 0 && <Paletts delivery={delivery} />} */}

      {/* // <Paletts delivery={delivery[counter % delivery.length]} /> */}
    </div>
  );
}
