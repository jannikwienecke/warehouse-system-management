import styled from "styled-components";

export const InputElement = styled.input`
  padding: 1rem;
  border: none;
  border: 1px solid darkgrey;
  */background: #eee;
  transition: 0.5s;
  border-radius: 10px;
  display: block;
  width: 25%;
  text-align: center;
  font-size: 1.7em;
  letter-spacing: 0.1rem;
  font-weight: bold;

  :active {
    border: none;
  }
  :focus {
    border: 1px solid darkgrey;
    outline: none;
  }
  :hover {
    font-size: 1.8rem;
  }
`;

export const LKW = styled.div`
  border: 2px solid #232323;
  // width: 745px;
  // height: 250px;
  background: #111;
  position: relative;
  left: 50%;
  margin-left: -372px;
  margin-top: 1rem;

  ${({ width }) =>
    width &&
    `
    // height: ${width / 10}px;
 `}

  ${({ length }) =>
    length &&
    `
    width: ${length / 10}px;
 `}
`;

export const LoadingZone = styled.div`
  // width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  background: #232323;

  ${({ length }) =>
    length &&
    `
    width: ${length / 10}px;
 `}
`;

export const PalleteWrapper = styled.div`
border: 1px solid #ccc;
background-color: #fefefe;
margin-top: 1.2px;
position: relative;
transition: .5s background;

:hover{
  background: #283593;
  cursor: pointer;
  color: #eee;
}


${({ packagingId }) =>
  packagingId == 1 &&
  `
  width : 120px;
  height: 80px;
 `}

${({ packagingId }) =>
  packagingId == 2 &&
  `
  width : 100px;
  height: 120px;
 `}

${({ turn, packagingId }) =>
  turn &&
  packagingId == 1 &&
  `
  width : 80px;
  height: 120px;
 `}

 ${({ isSelected }) =>
   isSelected &&
   `
  background :#3f51b5;
 `}

 ${({ width, height }) =>
   width &&
   height &&
   `
width : ${width / 10}px;
height : ${height / 10}px;
`}

${({ freeSpaceType, width }) =>
  freeSpaceType === "end" &&
  `
  border : 2px solid #af4448;
  height : 96%;
  background : transparent;
  width: ${width / 10 - 7}px;
  position: relative;
  top: 0.5px;
  left: 1.5px;
 `}

 ${({ freeSpaceType }) =>
   freeSpaceType === "filler" &&
   `
   background: #af4448;
`}

`;
