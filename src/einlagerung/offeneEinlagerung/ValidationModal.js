import React, { useState, useEffect } from "react";
import ModularModal from "../../components/modal/Modal";
import styled from "styled-components";
import { Parent } from "../../baseComponents/Parent";
import { INPUT, IDENTIFIER } from "../../baseComponents/base";
import { mockAPI, setArrInputSize, copy } from "../../functions/utils";
import { einlagerungen } from "../../testData";

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
    console.log("CANCEL ....");

    selectRow(null);
  };

  const _update = () => {
    showUpdateForm(true);
  };

  const _submitUpdatedData = (data) => {
    console.log("DATA = ", data);

    selectedRow.row_id = data.storage.value;
    selectedRow.employee_id = data.employees.id;
    selectedRow.quantity = data.quantity;
    selectedRow.notes = data.notes;

    selectRow(selectedRow);
    submitOrder();
  };

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
        close={_cancel}
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
  const [arrInput, setArrInput] = useState(null);

  useEffect(() => {
    setArrInput_();
  }, []);

  const setArrInput_ = () => {
    console.log("RUN!!!!!");

    var arrInput_ = [
      INPUT.storage,
      INPUT.employees,
      INPUT.quantity,
      INPUT.notes,
    ];

    INPUT.storage.filter = (storage) => {
      const x = storage.filter((row) => row.isFull === false);
      return x;
    };

    setDefaults(arrInput_, selectedRow);
    setArrInputSize(arrInput_, 12);
    setArrInput(arrInput_);
  };

  const setDefaults = (arrInput_, obj) => {
    console.log("arrINPUT", arrInput_);

    arrInput_.forEach((input) => {
      const { identifier, labelName } = input;
      if (identifier) {
        input.default = {
          [identifier]: selectedRow[identifier],
          [labelName]: selectedRow[labelName],
        };
      } else {
        input.default = selectedRow[input.name];
      }
    });
  };

  console.log("--------------------------------------------");
  console.log("--------------------------------------------");

  if (!arrInput) return <></>;
  return (
    <>
      <ModularModal
        close={() => _cancel}
        visible={selectedRow}
        headline={""}
        btnArr={[
          {
            text: "Abbrechen",
            variant: "outline-dark",
            func: _cancel,
          },
        ]}
      >
        <Parent
          form={{
            formTitle: "Einlagerungen Suchen",
            arrInput: arrInput,
            middlewareValidation: [],
            middlewareParse: [],
            requiredArguments: [INPUT.storage.name],
            cardWrapper: false,
            apiFunc: (dispatch, parameter) => {
              return mockAPI(einlagerungen, parameter, 1000).then((res) =>
                // console.log("SUBMIT FUNC ", parameter)
                _submitUpdatedData(parameter)
              );
            },
          }}
        />
      </ModularModal>
    </>
  );
};
