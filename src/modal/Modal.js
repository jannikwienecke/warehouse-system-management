import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

const ModularModal = ({ children, headline, close, visible, btnArr }) => {
  const btnList = () => {
    return btnArr.map(btn => (
      <Button className={"mr-1 ml-1"} variant={btn.variant} onClick={btn.func}>
        {btn.text}
      </Button>
    ));
  };

  return (
    <>
      <Modal show={visible} onHide={close} animation={true}>
        <ContentAlertBox>
          <h3>{headline.toUpperCase()}</h3>
          {children}
          {btnList()}
        </ContentAlertBox>
      </Modal>
    </>
  );
};

export default ModularModal;

const ContentAlertBox = styled.div`
  padding: 1rem;
`;
