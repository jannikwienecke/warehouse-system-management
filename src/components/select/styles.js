import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-left: 1rem;
`;
export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const SelectType = styled.input`
  border: 0.5px solid #ddd;
  padding: 0.5rem;
  padding-left: 3.5rem;
  width: 20rem;
  text-align: left;
  font-size: 1.4rem;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  font-weight: 700;
  // margin-right: 5rem;
  transition: 1s;
  box-shadow: 2px 5px 5px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  :focus {
    outline: none;
  }
  :hover {
    border: 1px solid #3f51b5;
  }
`;

export const Options = styled.span`
  position: absolute;
  top: 3rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: #fff;
  margin-top: 1rem;
  box-shadow: 2px 5px 5px 1px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  color: #5e5e5e;
  padding: 0.5rem;

  ${({ showOptions }) =>
    !showOptions &&
    `
    display: none;

    `}
`;

export const Option = styled.span`
  padding: 0.5rem;
  padding-left: 2rem;
  transition: 0.5s;
  border-bottom: 1px solid #eee;

  ${({ active, id }) =>
    active === id &&
    `
    background : #9f9f9f;
    color: #3f51b5;
    border-bottom: 1px solid #ccc
    `}
`;
