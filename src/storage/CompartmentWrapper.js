import React from "react";
import styled from "styled-components";
import { copy } from "../functions/utils";
import { useEffect, useState } from "react";
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  return position;
};

export const CompartmentWrapper = (props) => {
  var { width, direction, color, height, position, name } = props.compartment;

  const isCompartment = props.compartment.name.includes("comp");
  const [hover, setHover] = useState(null);
  const [originalProps, setOriginalProps] = useState(null);
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 5);
  }, []);

  if (props.compartmentZoom === name) {
    width = 90;
    height = 90;

    var position_ = {
      top: 5,
      left: 5,
    };
  } else {
    var { width, coloheight } = props.compartment;
    var position_ = position;
  }

  const handleClickZomm = () => {
    if (!props.compartmentZoom) {
      props.zoom(props.compartment.name);
    } else {
      props.zoom(null);
    }
  };

  return (
    <Wrapper
      onMouseOver={() => setHover(props.compartment.name)}
      onMouseLeave={() => setHover(null)}
      type={name}
      width={width}
      direction={direction}
      color={color}
      height={height}
      position={position_}
      visible={visible}
    >
      {isCompartment && (
        <HoverBtn visible={hover === props.compartment.name}>
          <ButtonHover onClick={handleClickZomm}>
            {props.compartmentZoom ? "Alles" : "Zoom"}
          </ButtonHover>
        </HoverBtn>
      )}
      {props.children}
    </Wrapper>
  );
};

const HoverBtn = styled.div`
  background: rgba(10, 10, 10, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;

  ${({ visible }) =>
    !visible &&
    `
    display : none;
  `}
`;

const ButtonHover = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2rem;
  width: 4rem;
  background: #eee;
  border: 0;
  padding: 0.1rem 0.6rem 0.1rem 0.6rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  background: rgba(200, 200, 200, 0.5);
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  pointer-events: auto;
`;

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  position: absolute;
  background: lightblue;
  transition: 1.5s opacity;
  
    ${({ visible }) =>
      !visible &&
      `
    opacity : 0;
  `}
      ${({ visible }) =>
        visible &&
        `
    opacity : 1;
  `}

  ${({ position }) =>
    position &&
    `
    top : ${position.top}%;
    left : ${position.left}%;
  `}

  ${({ height }) =>
    height &&
    `
    height : ${height}%;
  `}

  ${({ width }) =>
    width &&
    `
  width : ${width}%;
  `}

  ${({ direction }) =>
    direction &&
    `
    flex-direction : ${direction};
  `}

  ${({ color }) =>
    color &&
    `
  background : ${color};
  `}
`;
