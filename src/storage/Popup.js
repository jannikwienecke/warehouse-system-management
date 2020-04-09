import styled from "styled-components";

export const PopupCardWrapper = styled.div`
  cursor: default;
  width: 50%;
  max-width: 800px;
  background: #f5f5f5;
  box-shadow: 0 30px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  font-family: unset;
  display: block;
  margin: 100px auto;
  margin-left: -25%;
  transition: 1s;
  height: 530px;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 10;
`;

export const PopupUpper = styled.div`
  height: 30%;
  background: #3d5afe;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-content: normal;
  padding: 1rem;
  text-align: center;

  ${({ size }) =>
    size === "big" &&
    `
  height: 37%;
  padding-top: 3rem;
  `}
`;

export const PopupHeaderText = styled.div`
  font-size: 2rem;
  font-family: cursive;
  line-height: 4rem;
  color: #fff;
`;

export const PopupHeaderTextSmall = styled.div`
  font-size: 1.2rem;
  font-family: cursive;
  line-height: 2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

export const PopupHeaderBtn = styled.button`
  background: transparent;
  border: 0;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #fff;
  border: 1px solid darkslategrey;
  transition: 0.3s;
  :focus {
    outline: none;
  }

  :hover {
    background: #2962ff;
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
  position: absolute;
  /* border: 1px solid black; */
  padding: 1px;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid;
  padding: 0 3px;
  border-radius: 10px;
  color: #212121;
  top: 110px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.9);
  font-size: 0.8rem;
  transition: .4s
  :hover {
    font-size: 0.85rem;
  }
`;
