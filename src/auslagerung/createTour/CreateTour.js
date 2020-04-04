import React from "react";
import "./styles.css";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import Paletts from "./Pallets";
import { DELIVERY } from "./data";
import { useState } from "react";
import { EURO, INDUSTRY } from "./constants";
import { useEffect } from "react";
import { copy } from "./helper";

export default function CreateTour() {
  const [delivery, setDelivery] = useState([]);
  const [counter, incrCounter] = useState(0);
  const [rerender, setRerender] = useState();

  return (
    <div>
      <h1>Auslagerung</h1>
      {/* <Control incrCounter={incrCounter} counter={counter} /> */}
      {/* <OrderForm delivery={delivery} setDelivery={setDelivery} /> */}
      {/* {delivery.length > 0 && (
        <Paletts delivery={delivery} /> */}
      {/* <Paletts delivery={delivery[counter % delivery.length]} /> */}
    </div>
  );
}
// const Control = ({ incrCounter, counter }) => {
//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         endIcon={<Icon>send</Icon>}
//         onClick={() => incrCounter(++counter)}
//       >
//         Auftrag Generieren
//       </Button>

//       <Button
//         variant="contained"
//         color="secondary"
//         endIcon={<Icon>send</Icon>}
//         onClick={() => incrCounter(++counter)}
//       >
//         Auftrag Eingeben
//       </Button>
//     </>
//   );
// };

const products = [
  { name: "Polykanister ", id: 1 },
  { name: "Flachkannen", id: 2 },
  { name: "F2 Karton", id: 3 },
];

const buildungs = [
  { name: "G20", id: 1, building: 1 },
  { name: "E30", id: 2, building: 1 },
  { name: "A222", id: 3, building: 2 },
];

// const OrderForm = ({ delivery, setDelivery }) => {
//   const classes = useStyles();
//   const [product, setProduct] = useState("");
//   const [building, setBuildung] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const addOrderElement = () => {
//     console.log("Add", product, building, quantity);
//     var delivery_ = copy(delivery);

//     delivery_.push({
//       id: delivery.length + 1,
//       type: product.id % 2 === 0 ? EURO : INDUSTRY,
//       product: product.name,
//       quantity: parseInt(quantity),
//       factory: building.building,
//       building: building.name,
//     });
//     setDelivery(delivery_);
//     console.log("done...");
//   };
