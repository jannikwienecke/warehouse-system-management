import React, { useState } from "react";

import styled from "styled-components";
import { Button } from "react-bootstrap";
import ModularModal from "./modal/Modal";

const MyModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <h1>HEADER TEST</h1>

      <Button variant="outline-danger" onClick={() => setVisible(true)}>
        Click Me
      </Button>

      <ModularModal
        close={() => setVisible(false)}
        visible={visible}
        headline="My Modal"
        btnArr={[
          {
            text: "Cancel",
            variant: "outline-dark",
            func: () => setVisible(false)
          },
          {
            text: "OK",
            variant: "dark",
            func: () => console.log("CLICK OK")
          }
        ]}
      >
        <TestChildren />
      </ModularModal>
    </>
  );
};

export default MyModal;

const TestChildren = () => {
  return (
    <>
      <InputElement
        type="text"
        value="test"
        onChange={e => console.log("onchange")}
      />
    </>
  );
};

const InputElement = styled.input`
  padding: 1rem;
  border: none;
  border: 1px solid darkgrey;
  */background: #eee;
  transition: 0.5s;
  border-radius: 10px;
  margin: 1rem 0 1rem 0;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1.7em;
  letter-spacing: 0.1rem;
  font-weight: bold;

  :active {
    border: none;
  }
  :focus {
    border: 1px solid darkgrey;
    outline: none;
  }
  :hover {
    font-size: 1.8rem;
  }
`;
