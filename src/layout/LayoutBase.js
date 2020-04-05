import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Sidebar } from "./sidebar/Sidebar";
import { Content } from "./Content";
import { FaBars } from "react-icons/fa";

export const LayoutBase = ({ width, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Layout>
      <OpenSidebarBtn isVisible={isVisible} onClick={() => setIsVisible(true)}>
        <FaBars />
      </OpenSidebarBtn>

      <ContentWrapper width={width} isVisible={isVisible}>
        <Content width={90}>{children}</Content>
      </ContentWrapper>
      <SidebarWrapper width={100 - width} isVisible={isVisible}>
        <Sidebar close={() => setIsVisible(false)} />
      </SidebarWrapper>
    </Layout>
  );
};

const OpenSidebarBtn = styled.div`
  color: #3f51b5;
  background: #e7e7e7;
  font-weight: bolder;
  font-size: 1.05rem;
  border: 0.5px solid #d2d2d2;
  border-radius: 10rem;
  padding-bottom: 0.15rem;
  padding-right: 0.4rem;
  padding-left: 0.4rem;
  position: fixed;
  top: 1rem;
  right: 1rem;

  transition: 1000ms;
  opacity: 1;

  ${({ isVisible }) =>
    isVisible &&
    `
    transform: translate(200px, -300px);
  `}
`;
const Layout = styled.div`
  display: flex;
  flex-direction: row;
`;
const ContentWrapper = styled.div`
  width: 75%;
  transition: 1000ms;

  ${({ width }) =>
    width &&
    `
  width: ${width}%;
  `}

  ${({ isVisible }) =>
    !isVisible &&
    `
    width: 100%;
  `}
`;
const SidebarWrapper = styled.div`
  position: fixed;
  width: 25%;
  height: 100%;
  left: 75%;
  border-left: 1.5px solid #efefef;
  color: #4f4f4f;
  text-align: left;
  padding-left: 5%;
  padding-right: 7%;
  transition: 1s;
  opacity: 1;

  ${({ isVisible }) =>
    !isVisible &&
    `
    transform: translate(200px, 150px);
    opacity: 0;
  `};

  ${({ width }) =>
    width &&
    `
  width: ${width}%;
  left: ${100 - width}%;
  `};
`;

LayoutBase.propTypes = {
  width: PropTypes.number,
};
