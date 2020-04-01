import React, { useState } from "react";

import Popup from "./popup/Popup";
import { Button } from "react-bootstrap";

const MyPopup = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <h1>HEADER TEST</h1>
      <Button variant="outline-danger" onClick={() => setVisible(true)}>
        SHOW POPUP
      </Button>
      <Popup
        visible={visible}
        close={() => setVisible(false)}
        marginTop="2rem"
        height={"300px"}
        heightHeader="40%"
        headline="Mein Popup"
        btnArr={[{ func: () => console.log("click btn"), text: "Click Me" }]}
      >
        THIS IS A CHILDREN PROP
      </Popup>
    </>
  );
};

export default MyPopup;
