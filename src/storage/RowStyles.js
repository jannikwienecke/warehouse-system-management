import styled from "styled-components";

export const RowPopup = styled.div`
  background: #eee;
  position: absolute;
  width: 15rem;
  z-index: 1;
  font-size: 0.8rem;
  background: #333;
  color: #eee;
  padding: 0.5rem;
  border-radius: 0.1rem;
  border: 0.5px solid darkgray;
  box-shadow: 1px 5px 4px rgba(0, 0, 0, 0.5);

  ${({ stock, positionCompartment, directionCompartment }) =>
    positionCompartment === "top" &&
    directionCompartment === "column" &&
    `
      top : 100%;
      left: -3rem;
    `}
  ${({ stock, positionCompartment, directionCompartment }) =>
    positionCompartment === "bottom" &&
    directionCompartment === "column" &&
    `
  top : 50%;
`}
`;

export const RowWrapper = styled.div`
// background: #ddd;
height: 100%;
margin: 0.5%;
transition: 0.3s;
background: #ccc;
border: .5px solid #ababab;
transition: .3s;
background : #aaa;

${({ width }) =>
  width &&
  `
    width : ${width}%;
  `}

${({ directionCompartment, width }) =>
  width &&
  directionCompartment === "row" &&
  `
      height : ${width}%;
      width : 100%;
    `}	


${({ hasStock }) =>
  !hasStock &&
  `
      background : #66bb6a;
    `};
  
:hover {
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
}

`;

export const RowNumber = styled.div`
text-align: center;
position: relative;
top: 6%;
left: 5%;
font-size: 2vh;
color: #eee;

${({ stock, positionCompartment, directionCompartment }) =>
  positionCompartment === "bottom" &&
  directionCompartment === "column" &&
  `
    top : -${stock - 10}%;
  `}

${({ stock, positionCompartment, directionCompartment }) =>
  positionCompartment === "top" &&
  directionCompartment === "column" &&
  `
      top : +${100 - stock - 10}%;
    `}

${({ positionCompartment, directionCompartment }) =>
  positionCompartment === "bottom" &&
  directionCompartment === "row" &&
  `
        top : -60%;
        left: 35%;

      `}

${({ positionCompartment, directionCompartment }) =>
  positionCompartment === "top" &&
  directionCompartment === "row" &&
  `
        top : -60%;
        left: -35%;

      `}


`;

export const RowStock = styled.div`
background: #7f0000;
width: 100%;
height: 0%;
position: relative;


${({ stock, positionCompartment, directionCompartment }) =>
  stock &&
  positionCompartment === "bottom" &&
  directionCompartment === "column" &&
  `
    height : ${stock}%;
    top: ${100 - stock}%;
  `}

${({ stock, positionCompartment, directionCompartment }) =>
  stock &&
  positionCompartment === "top" &&
  directionCompartment === "column" &&
  `
      height : ${stock}%;
    `}

${({ stock, positionCompartment, directionCompartment }) =>
  stock &&
  positionCompartment === "bottom" &&
  directionCompartment === "row" &&
  `
        width : ${stock}%;
        height: 100%;
        background : 'red';

      `}

${({ stock, positionCompartment, directionCompartment }) =>
  positionCompartment === "top" &&
  directionCompartment === "row" &&
  `
        width : ${stock}%;
        height: 100%;
        background : 'red';
        left: ${100 - stock}%;

      `}


`;
