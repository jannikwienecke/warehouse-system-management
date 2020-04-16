import posed from "react-pose";
import styled, { keyframes, css } from "styled-components";

var Box_ = {};
Box_.Container = posed.div({
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  hidden: {
    opacity: 0,
  },
});
Box_.Style = {
  position: "relative",
};
export const Box = Box_;

export const Layover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background: rgb(220, 220, 220, 0.5);
  z-index: 1;
`;

export const PopupCardWrapper = styled.div`
  cursor: default;
  width: 75%;
  max-width: 800px;
  background: #f5f5f5;
  box-shadow: 0 30px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: block;
  margin: 20px auto;
  margin-bottom: 2rem;
  transition: 1s;
  min-height: 400px;
  opacity: 0;
  overflow: scroll;
      overflow-y: auto;
    overflow-x: hidden;

    ${({ visible }) =>
      visible &&
      `
    opacity: 1;
`}

  ${({ marginTop }) =>
    marginTop &&
    `
    margin-top: ${marginTop};
`}

  ${({ height }) =>
    height &&
    `
    height: ${height}
`}
`;

export const PopupUpper = styled.div`
  height: 30%;
  background: #3f51b5;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-content: normal;
  padding: 1rem;
  text-align: center;

  ${({ color }) =>
    color &&
    `
    background: ${color}
  `}

  ${({ height }) =>
    height &&
    `
  height: ${height};
  `}
`;

export const PopupUpperContent = styled.div`
  position: relative;
  top: -2rem;
`;

export const PopupHeaderText = styled.div`
  font-size: 2.4rem;
  line-height: 4rem;
  color: #fff;
  padding: 2rem 0.5rem 0.5rem 0.5rem;
`;

export const PopupHeaderTextSmall = styled.div`
  font-size: 1.2rem;
  font-family: cursive;
  line-height: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

export const PopupHeaderBtn = styled.button`
  font-size: 0.9rem;
  background: transparent;
  border: 0;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 0.4rem;
  margin: 0 0.1rem 0 0.1rem;
  border-radius: 0.5rem;
  color: #fff;
  border: 1px solid darkslategrey;
  transition: 0.5s;
  :focus {
    outline: none;
  }

  :hover {
    // background: #2962ff;
    background: white;
    color: black;
    font-weight: 500;
  }
`;

export const PopupLower = styled.div`
  padding-top: 1rem;
`;

export const PopupLowerCard = styled.div`
  padding: 1.2rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-family: monospace;

  transition: 0.5s;
  :hover {
    box-shadow: 0 5px 3px 0 rgba(0, 0, 0, 0.4);
    font-size: 1.11rem;
  }
`;

export const CloseBtn = styled.div`
  z-index: 1;
  position: relative;
  display: inline-block;
  left: -40%;
  padding: 1px;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid;
  padding: 0 3px;
  border-radius: 10px;
  color: #212121;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.9);
  font-size: 0.8rem;
  transition: .4s
    :hover {
    font-size: 0.85rem;
  }
`;
