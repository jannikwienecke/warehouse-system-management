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

  ${({ stock, realPosition, direction }) =>
    realPosition === "top" &&
    direction === "column" &&
    `
      top : 100%;
      left: -3rem;
    `}
  ${({ stock, realPosition, direction }) =>
    realPosition === "bottom" &&
    direction === "column" &&
    `
  top : 50%;
`}
`;

export const RowWrapper = styled.div`
// background: #ddd;
height: 100%;
margin: 0.5%;
background: #ccc;
border: .5px solid #ababab;
background : #aaa;
transition: 2s background;





${({ width }) =>
  width &&
  `
    width : ${width}%;
  `}

${({ direction, width }) =>
  width &&
  direction === "row" &&
  `
      height : ${width}%;
      width : 100%;
    `}	


${({ hasStock }) =>
  !hasStock &&
  `
      background : #66bb6a;
    `};

${({ hasStock, isFiltered }) =>
  !hasStock &&
  isFiltered &&
  `
      background : #7f0000;
    `};
  

${({ isFiltered }) =>
  isFiltered === false &&
  `
    background : rgba(100,100,100,0.4);
    
  `}


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

${({ stock, realPosition, direction }) =>
  realPosition === "bottom" &&
  direction === "column" &&
  `
    top : -${stock - 10}%;
  `}



  ${({ stock, realPosition, direction }) =>
    realPosition === "top" &&
    direction === "column" &&
    `
      top : +${100 - stock - 10}%;
    `}

${({ stock, realPosition, direction }) =>
  realPosition === "top" &&
  direction === "column" &&
  stock === 100 &&
  `
      top : -${100 - stock + 10}%;
    `}


${({ stock, realPosition, direction }) =>
  realPosition === "top" &&
  direction === "column" &&
  stock === 0 &&
  `
      top : +${90}%;
    `}

${({ realPosition, direction }) =>
  realPosition === "bottom" &&
  direction === "row" &&
  `
        top : -60%;
        left: 35%;

      `}

${({ realPosition, direction }) =>
  realPosition === "top" &&
  direction === "row" &&
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
transition: 2s;



${({ stock, realPosition, direction }) =>
  stock &&
  realPosition === "bottom" &&
  direction === "column" &&
  `
    height : ${stock}%;
    top: ${100 - stock}%;
  `}

${({ stock, realPosition, direction }) =>
  stock &&
  realPosition === "top" &&
  direction === "column" &&
  `
      height : ${stock}%;
    `}

${({ stock, realPosition, direction }) =>
  stock &&
  realPosition === "bottom" &&
  direction === "row" &&
  `
        width : ${stock}%;
        height: 100%;
        background : 'red';

      `}

${({ stock, realPosition, direction }) =>
  realPosition === "top" &&
  direction === "row" &&
  `
        width : ${stock}%;
        height: 100%;
        background : 'red';
        left: ${100 - stock}%;

      `}

      ${({ isFiltered }) =>
        isFiltered &&
        `
    // background : #00838f;
    background: #7f0000;
  `}

${({ isFiltered }) =>
  isFiltered === false &&
  `
    background : rgba(100,100,100,0.4);
    
  `}


`;
