import React, { useState, useEffect } from "react";

import Popup from "../../components/popup/Popup";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import styled from "styled-components";
import { translate } from "../../functions/utils";

const SummaryPopup = ({ summary, cancel, approve, approveAndPrint }) => {
  const [visible, setVisible] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (summary) setVisible(true);
  }, summary);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <Popup
        visible={visible}
        close={() => cancel(true)}
        marginTop="2rem"
        height={"700px"}
        heightHeader="35%"
        headline="Einlagerung Überprüfen"
        btnArr={[
          {
            func: () => approve(true),
            text: "Abschließen"
          },
          {
            func: () => approveAndPrint(true),
            text: "Abschlißen und Auftrag Drucken"
          },
          {
            func: () => cancel(true),
            text: "Einlagerung Abbrechen"
          }
        ]}
      >
        <Content summary={summary} />
      </Popup>
    </>
  );
};
export default SummaryPopup;

const Content = ({ summary }) => {
  console.log("SUMMARY", summary);

  return (
    <Wrapper>
      <Summary summary={summary} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0.3rem;
  text-align: left;
`;

const Summary = ({ summary }) => {
  return (
    <ListWrapper>
      {Object.keys(summary).map(key => {
        const val = summary[key];

        if (key === "bridges") {
          var Items = val.map((bridge, index) => (
            <Item key={index}>
              {index + 1} - {bridge.bridgeNumber.label}: Anzahl:{" "}
              {bridge.quantity}
            </Item>
          ));
        } else if (key === "rows") {
          var Items = val.map((row, index) => (
            <Item key={index}>
              {index + 1} - Reihe: {row.label} - Halle: {row.storage} - Anzahl:{" "}
              {row.quantity}
            </Item>
          ));
        } else {
          if (val && typeof val == "object" && "value" in val) {
            var text = `${val.value} - ${val.label}`;
          } else if (val) {
            var text = val;
          } else {
            var text = "Keine Angabe";
          }
          var Items = [
            <Item key={0}>
              {translate(key)}: {text}
            </Item>
          ];
        }

        return <ListItem key={key}>{Items}</ListItem>;
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
  margin: 0.1rem 0 0.1rem 0;

  :hover {
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  }
`;

const Item = styled.div``;
