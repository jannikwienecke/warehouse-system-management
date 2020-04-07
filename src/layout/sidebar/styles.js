import styled, { keyframes, css } from "styled-components";

export const sb = {};

sb["openKeyFrame"] = keyframes`
0% {
  height: 0px;
  opacity: 0;
  visibility: hidden;
  transform: translate(100px, 0px);
}
  50%{
    opacity: 0.2;
  }
100% {
  height: 150px;
  opacity: 1;
  visibility: visible;
  transform: translate(0px, 0px);
}
`;

sb["closeKeyFrame"] = keyframes`
0% {
  height: 150px;
  opacity: 1;
  visibility: visible;
  transform: translate(0px, 0px);
}
50%{
    opacity: 0;
}
100% {
  height: 0px;
  opacity: 0;
  visibility: hidden;
  transform: translate(100px, 0px);
  
}
`;

sb["ListItemWrapper"] = styled.div`
  font-size: 1.1rem;
  visibility: hidden;
  height: 0px;

  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${sb.openKeyFrame} 0.5s ease-in-out forwards;
      animation-iteration-count: 1;
    `}

  ${({ isVisible }) =>
    isVisible === false &&
    css`
      animation: ${sb.closeKeyFrame} 0.5s ease-in-out;
      animation-iteration-count: 1;
    `}
`;

sb["ListItem"] = styled.div`
  padding: 0.5rem 0 0.5rem 1rem;

  :hover {
    background: rgb(63, 81, 181, 0.8);
    color: #fff;
    cursor: pointer;
  }
`;

sb["Header"] = styled.div`
  margin-top: 20%;
  margin-bottom: 10%;
`;

sb["ListWrapper"] = styled.div``;

sb["ListRow"] = styled.div`
  border-bottom: 1.5px solid #efefef;
  padding-top: 5%;
  padding-bottom: 3%;

  :hover {
    // cursor: pointer;
    background: #fafafa;
  }
`;

sb["ListHeader"] = styled.div`
  cursor: pointer;
`;
sb["CloseSidebarWrapper"] = styled.div``;

sb["CloseSidebarBtn"] = styled.button`
  color: #3f51b5;
  background: #e7e7e7;
  font-weight: bolder;
  font-size: 1.05rem;
  border: 0.5px solid #d2d2d2;
  border-radius: 10rem;
  position: relative;
  top: 1rem;
  left: -24%;
  padding-bottom: 0.15rem;
  padding-right: 0.4rem;
  padding-left: 0.4rem;
`;

sb["IconHeader"] = styled.span`
  position: absolute;
  right: 25%;
`;
