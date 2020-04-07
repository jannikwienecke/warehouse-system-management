import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import { ButtonSelection } from "../components/button/ButtonSelection";

const Dashboard = ({ header, sub_pages, components }) => {
  const [type, setType] = useState(null);

  if (type) {
    const page = sub_pages.find((page) => page.name === type);
    const Component = components[page.name];
    return <Component setType={setType} type={type} />;
  }
  return (
    <>
      <Header>{header}</Header>

      <DashboardWrapper>
        {sub_pages.map((page, index) => (
          <ButtonSelection key={index} onClick={() => setType(page.name)}>
            {page.name}
          </ButtonSelection>
        ))}
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  margin-top: 3rem;
`;
