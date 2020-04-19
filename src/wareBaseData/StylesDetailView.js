import styled from "styled-components";
export const ValueText = styled.span`
  font-weight: 600;
`;
export const ButtonWrapper = styled.div`
  text-align: left;
  position: absolute;
  bottom: 0;
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
`;
export const ListWrapper = styled.div`
  margin: 0.5rem 0 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.5rem 2rem 0.5rem 2rem;

  ${({ numberItems }) =>
    numberItems < 5 &&
    `
    justify-content: space-around;
  `}
`;
export const ListItem = styled.div`
  width: 48%;
  padding: 0.6rem;
  border: 0.5px solid #ddd;
  border-radius: 0.4rem;
  margin: 0.3rem 0 0.3rem 0;
  font-size: 1.1rem;

  text-transform: uppercase;

  ${({ numberItems }) =>
    numberItems < 5 &&
    `
    width: 80%;
  `}

  :hover {
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  }
`;
