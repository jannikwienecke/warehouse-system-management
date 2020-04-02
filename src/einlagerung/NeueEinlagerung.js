import React, { useState } from "react";
import { Header } from "../components/header/Header";
import { ButtonPageNav } from "../components/button/ButtonPageNav";
import { Navigation } from "../components/navigation/Navigation";
import { SUB_PAGES } from "./data";
import Form from "./Form";
import { Container } from "../components/Container/Container";
import { Button } from "react-bootstrap";
import ModularModal from "../components/modal/Modal";
import styled from "styled-components";

export const NeueEinlagerung = ({ setType, type }) => {
  const [values, setValues] = useState(null);

  return (
    <>
      <Modal values={values} setValues={setValues} />
      <Header>Neue Einlagerung</Header>
      <Navigation>
        <ButtonPageNav onClick={() => setType(null)}>Zurück</ButtonPageNav>

        {SUB_PAGES.filter(page => page.name !== type).map((page, index) => (
          <ButtonPageNav onClick={() => setType(page.name)}>
            {page.name}
          </ButtonPageNav>
        ))}
      </Navigation>

      <Container>
        <Form setValues={setValues} />
      </Container>
    </>
  );
};

const Modal = ({ setValues, values }) => {
  return (
    <>
      <ModularModal
        close={() => setValues(false)}
        visible={values}
        headline="Eingaben Korrekt?"
        btnArr={[
          {
            text: "Cancel",
            variant: "outline-dark",
            func: () => setValues(false)
          },
          {
            text: "OK",
            variant: "dark",
            func: () => console.log("CLICK OK")
          }
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
      {Object.keys(values).map(key => {
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
