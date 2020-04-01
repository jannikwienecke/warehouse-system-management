import React from "react";
import "./styles.css";
import MyForm from "./MyForm";
import MyTable from "./MyTable";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import MyPopup from "./MyPopup";
import MyModal from "./MyModal";

export default function App() {
  return (
    <div className="App">
      <MyPopup />
      <MyModal />
      <MyForm />
      <MyTable />
    </div>
  );
}

const Table = styled.table`
  border-radius: 1000px;
  border: 10px solid gainsboro;
  border-collapse: collapse;
`;
