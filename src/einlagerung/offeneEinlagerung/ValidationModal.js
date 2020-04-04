import React, { useState, useEffect } from "react";
import ModularModal from "../../components/modal/Modal";
import styled from "styled-components";
import { UpdateForm } from "./UpdateForm";

export const ValidationModal = ({
  selectedRow,
  selectRow,
  submitOrder,
  openRows,
}) => {
  const [updateForm, showUpdateForm] = useState(null);

  const _validate = () => {
    submitOrder();
  };

  const _cancel = () => {
    selectRow(null);
  };

  const _update = () => {
    showUpdateForm(true);
  };

  const _submitUpdatedData = (data) => {
    selectedRow.row_id = data.row.value;
    selectedRow.einlagerer_id = data.einlagerer.value;
    selectedRow.quantity = data.quantity;
    selectedRow.notes = data.notes;

    selectRow(selectedRow);
    submitOrder();
  };

  console.log("selectedrow = ", selectedRow);
  if (!selectedRow) return <></>;

  if (!updateForm) {
    return (
      <ModalSubmit
        selectedRow={selectedRow}
        _update={_update}
        _validate={_validate}
        _cancel={_cancel}
      />
    );
  } else {
    return (
      <ModalUpdate
        selectedRow={selectedRow}
        _validate={_validate}
        _cancel={_cancel}
        _submitUpdatedData={_submitUpdatedData}
        openRows={openRows}
      />
    );
  }
};

const ModalSubmit = ({ selectedRow, _cancel, _validate, _update }) => {
  return (
    <>
      <ModularModal
        close={() => _cancel}
        visible={selectedRow}
        headline={"Einlagerung abschließen"}
        btnArr={[
          {
            text: "Abbrechen    ",
            variant: "outline-dark",
            func: _cancel,
          },
          {
            text: "Ändern",
            variant: "dark",
            style: { background: "#3f51b5" },
            func: _update,
          },
          {
            text: "Abschließen",
            variant: "dark",
            func: _validate,
          },
        ]}
      ></ModularModal>
    </>
  );
};

const ModalUpdate = ({
  selectedRow,
  _cancel,
  _submitUpdatedData,
  openRows,
}) => {
  return (
    <>
      <ModularModal
        close={() => _cancel}
        visible={selectedRow}
        headline={""}
        btnArr={[
          {
            text: "Abbrechen    ",
            variant: "outline-dark",
            func: _cancel,
          },
        ]}
      >
        <UpdateForm
          _submitUpdatedData={_submitUpdatedData}
          selectedRow={selectedRow}
          openRows={openRows}
        />
      </ModularModal>
    </>
  );
};
