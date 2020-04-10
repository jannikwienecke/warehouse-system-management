import React, { useState, useReducer, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Sidebar } from "./sidebar/Sidebar";
import { Content } from "./Content";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AlertBanner } from "../common/AlertBanner";
import { copy } from "../functions/utils";

const useErrors = () => {
  const [errorQueue, setErrorQueue] = useState([]);
  const error = useSelector((state) => state.base.error);

  useEffect(() => {
    if (error) {
      setErrorQueue([...errorQueue, error]);
    }
  }, [error]);

  var errorBanners = errorQueue.map((err) => {
    if (!err) return <></>;
    const msg = `Status: ${err.code} - ${err.message}`;

    return <AlertBanner err={msg} />;
  });

  return { errorBanners };
};

export const LayoutBase = ({ width, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { errorBanners } = useErrors();

  return (
    <>
      {errorBanners.length > 0 && <ErrorWrapper>{errorBanners}</ErrorWrapper>}

      <Layout>
        <OpenSidebarBtn
          isVisible={isVisible}
          onClick={() => setIsVisible(true)}
        >
          <FaBars />
        </OpenSidebarBtn>

        <ContentWrapper width={width} isVisible={isVisible}>
          <Content width={90}>{children}</Content>
        </ContentWrapper>
        <SidebarWrapper width={100 - width} isVisible={isVisible}>
          <Sidebar close={() => setIsVisible(false)} />
        </SidebarWrapper>
      </Layout>
    </>
  );
};

const ErrorWrapper = styled.div`
  position: absolute;
`;

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
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
`;
const ContentWrapper = styled.div`
  width: 75%;
  transition: 1000ms;
  position: relative;
  height: 100vh;
  width: 75vw;

  ${({ width }) =>
    width &&
    `
  width: ${width}%;
  `}

  ${({ isVisible }) =>
    !isVisible &&
    `
    width: 100vw;
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
