import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./styles.css";

function useOutsideAlerter(ref, setOutside) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutside(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOutside]);
}

const options_ = [
  { value: 1, label: "Einlagerungen" },
  { value: 2, label: "Auslagerungen" },
  { value: 3, label: "Poprad" },
];

function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.setOutside);
  return <div ref={wrapperRef}>{props.children}</div>;
}

export default function App() {
  const [outside, setOutside] = useState(null);

  return (
    <>
      <OutsideAlerter setOutside={setOutside}>
        <MySelect setOutside={setOutside} outside={outside} />
      </OutsideAlerter>
      <h1>TEST</h1>
    </>
  );
}

const MySelect = ({ outside, setOutside }) => {
  const [active, setActive] = useState(1);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    if (outside) {
      setShowOptions(false);
      setOutside(false);
    }
  }, [outside, setOutside]);

  useEffect(() => {
    setOptions(options_);
  }, []);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const filteredOptions = options.filter((option) => {
    console.log("filter", filter);
    return option.label.toLowerCase().includes(filter);
  });

  var isActiveInList = false;
  filteredOptions.forEach((option) => {
    if (option.value === active) {
      isActiveInList = true;
    }
  });

  if (filteredOptions.length > 0 && !isActiveInList) {
    setActive(filteredOptions[0].value);
  }

  const optionslist = filteredOptions.map((option, index) => {
    return (
      <Option
        id={option.value}
        active={active}
        onMouseOver={() => setActive(option.value)}
        onClick={() => setFilter(option.label)}
      >
        {option.label}
      </Option>
    );
  });

  console.log("active = ", active);
  return (
    <div className="App">
      <Test>
        <SelectWrapper>
          <SelectType
            onClick={() => setShowOptions(true)}
            type="text"
            placeholder="Statistik wählen"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
            value={filter}
          />
          <Options showOptions={showOptions && filteredOptions.length > 0}>
            {optionslist}
          </Options>
        </SelectWrapper>
      </Test>
    </div>
  );
};

const Test = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-left: 1rem;
`;
const SelectWrapper = styled.div`
  // text-align: right;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SelectType = styled.input`
  border: 0.5px solid #ddd;
  padding: 0.5rem;
  padding-left: 2rem;
  /* border-radius: .5rem; */
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

const Options = styled.span`
  position: absolute;
  top: 3rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  /* width: 100%; */
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

const Option = styled.span`
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
