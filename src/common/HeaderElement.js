import React from "react";
import { Header } from "../components/header/Header";
import { Navigation } from "../components/navigation/Navigation";
import { ButtonPageNav } from "../components/button/ButtonPageNav";

export const HeaderElement = ({ setType, type, sub_pages }) => {
  return (
    <>
      <Header>{type}</Header>
      <Navigation>
        <ButtonPageNav onClick={() => setType(null)}>Zurück</ButtonPageNav>

        {sub_pages
          .filter((page) => page.name !== type)
          .map((page, index) => (
            <ButtonPageNav key={index} onClick={() => setType(page.name)}>
              {page.name}
            </ButtonPageNav>
          ))}
      </Navigation>
    </>
  );
};
