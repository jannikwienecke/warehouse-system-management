import React, { useState, useEffect } from "react";
import { Wrapper, SelectWrapper, SelectType, Options, Option } from "./styles";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const useFilter = (optionData) => {
  const [filter, setFilter] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(optionData);
  }, [optionData]);

  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().includes(filter);
  });

  return { setFilter, filteredOptions, filter };
};

const useOptionActive = (filteredOptions) => {
  const [active, setActive] = useState(1);

  var isActiveInList = false;
  filteredOptions.forEach((option) => {
    if (option.value === active) {
      isActiveInList = true;
    }
  });

  if (filteredOptions.length > 0 && !isActiveInList) {
    setActive(filteredOptions[0].value);
  }

  return { active, setActive };
};

export const Select = ({
  outside,
  setOutside,
  optionData,
  setValue,
  placeholder,
  defaultFilter,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { setFilter, filteredOptions, filter } = useFilter(optionData);
  const { active, setActive } = useOptionActive(filteredOptions);

  useEffect(() => {
    if (defaultFilter) setFilter(defaultFilter);
  }, [defaultFilter]);

  useEffect(() => {
    if (outside) {
      setShowOptions(false);
      setOutside(false);
    }
  }, [outside, setOutside]);

  useEffect(() => {
    if (filter !== null) {
      const option = optionData.find((option) => option.label === filter);

      setValue({ filter, option });
    }
  }, [filter]);

  const optionslist = filteredOptions.map((option, index) => {
    return (
      <Option
        key={index}
        id={option.value}
        active={active}
        onMouseOver={() => setActive(option.value)}
        onClick={() => setFilter(option.label)}
      >
        {option.label}
      </Option>
    );
  });

  return (
    <Wrapper>
      <SelectWrapper>
        <SearchSymbol>
          <FaSearch />
        </SearchSymbol>
        <SelectType
          onClick={() => setShowOptions(true)}
          type="text"
          placeholder={placeholder}
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
          value={filter}
        />
        <Options showOptions={showOptions && filteredOptions.length > 0}>
          {optionslist}
        </Options>
      </SelectWrapper>
    </Wrapper>
  );
};

const SearchSymbol = styled.span`
  position: absolute;
  top: 11px;
  left: 30px;
  font-size: 1.1rem;
  z-index: 1;
  color: #3f51b5;
`;
