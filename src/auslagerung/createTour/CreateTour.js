import React, { useState, useEffect } from "react";
import "./styles.css";
import Paletts from "./Pallets";
import { TABLE_VIEW, ANMITION_VIEW } from "./data";
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
  const [trucks, setTrucks] = useState(null);
  const [view, setView] = useState(ANMITION_VIEW);

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
        trucks={trucks}
      />

      {delivery && (
        <Paletts
          delivery={delivery}
          view={view}
          trucks={trucks}
          setTrucks={setTrucks}
        />
      )}

      {/* {delivery.length > 0 && <Paletts delivery={delivery} />} */}

      {/* // <Paletts delivery={delivery[counter % delivery.length]} /> */}
    </div>
  );
}
