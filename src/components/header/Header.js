import React from "react";
import styled from "styled-components";
export const Header = ({ children }) => {
  return (
    <Header_>
      <Logo>
        <LogoFirst>hamann</LogoFirst>
        <LogoSecond>spedition</LogoSecond>
      </Logo>
      {children}
    </Header_>
  );
};

const LogoFirst = styled.div`
  color: orange;
  padding: 0;
`;
const LogoSecond = styled.div`
  padding: 0;
  padding-left: 3rem;
  top: 36px;
  position: absolute;
`;
const Logo = styled.div`
  position: absolute;
  width: 15rem;
  top: 5%;
  right: 0%;
  font-size: 2rem;
`;
const Header_ = styled.div`
  position: relative;
  background: #3f51b5;
  height: 12rem;
  display: relative;
  color: #e8e8e8;
  padding-top: 6%;
  font-size: 2.6rem;
  text-align: left;
  font-weight: bold;
  padding-left: 10%;
`;
