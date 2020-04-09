import React from "react";
import styled from "styled-components";

export const CompartmentWrapper = (props) => {
  const { width, direction, color, height, position, name } = props.compartment;

  console.log("posiio", position);
  console.log("props", props);

  return (
    <Wrapper
      type={name}
      width={width}
      direction={direction}
      color={color}
      height={height}
      position={position}
    >
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  position: absolute;
  background: lightblue;
  
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
