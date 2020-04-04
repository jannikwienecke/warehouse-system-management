import React, { useState, useEffect } from "react";
import ModularModal from "../../components/modal/Modal";
import styled from "styled-components";

export const ModalValidationValues = (props) => {
  return <Modal {...props} />;
};

const Modal = ({ setValues, values, validate }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (values) setShowModal(true);
  }, [values]);

  const _validate = () => {
    setShowModal(false);
    validate(true);
  };

  const _cancel = () => {
    setShowModal(false);
    setValues(false);
  };

  return (
    <>
      <ModularModal
        close={() => _cancel}
        visible={showModal}
        headline="Eingaben Korrekt?"
        btnArr={[
          {
            text: "Cancel",
            variant: "outline-dark",
            func: _cancel,
          },
          {
            text: "OK",
            variant: "dark",
            func: _validate,
          },
        ]}
      >
        <FormResult values={values} />
      </ModularModal>
    </>
  );
};

const FormResult = ({ values }) => {
  return (
    <ListWrapper>
      {Object.keys(values).map((key) => {
        const val = values[key];
        if (val && typeof val == "object" && "value" in val) {
          var text = `${val.value} - ${val.label}`;
        } else if (val) {
          var text = val;
        } else {
          var text = "Keine Angabe";
        }
        return (
          <ListItem key={key}>
            {key} : {text}
          </ListItem>
        );
      })}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  margin: 1.5rem 0 1.5rem 0;
`;

const ListItem = styled.div`
  padding: 0.4rem;
  border: 0.5px solid #ddd;
  border-radius: 0.4rem;
  margin: 0.4rem 0 0.4rem 0;

  :hover {
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  }
`;
