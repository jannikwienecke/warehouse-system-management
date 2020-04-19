import React, { useState } from "react";

import styled from "styled-components";
import { Button } from "react-bootstrap";
import ModularModal from "../components/modal/Modal";

export const ValidateDeleteModal = ({ show, close, submit }) => {
  return (
    <>
      <ModularModal
        close={close}
        visible={show}
        headline="Wirklich Löschen?"
        btnArr={[
          {
            text: "Cancel",
            variant: "outline-dark",
            func: close,
          },
          {
            text: "OK",
            variant: "dark",
            func: submit,
          },
        ]}
      ></ModularModal>
    </>
  );
};
