import React from "react";
import { Table } from "../../baseComponents/Table";
import { ValidationModal } from "./ValidationModal";
import DetailView from "../../wareBaseData/DetailView";

export const TableTours = ({
  tableColumns,
  tableData,
  arrInput,
  fetchData,
  dataType,
  update,
  openWithdrawals,
}) => {
  const filterOpenWithdrawals = (data) => {
    return data.filter((data) => data.isOpen === "Ja");
  };

  const ModalConfigurations = {
    func: (rowData) => {
      return {
        children: <ValidationModal tour={rowData} />,
        props: {
          type: "Modal",
          btnList: [
            {
              func: () => update(rowData.original),
              text: "Anpassen",
            },
          ],
        },
      };
    },
  };

  const PopupConfigurations = {
    func: (rowData) => {
      return {
        children: (
          <DetailView
            rowData={rowData}
            dataType={dataType}
            arrInput={arrInput}
            fetchData={fetchData}
          />
        ),
        props: {
          header: "HEADDER NAME",
          type: "Popup",
          height: "80vh",
          heightHeader: "35%",
          header: "Detail Ansicht",
          hideSubmitBtn: true,
        },
      };
    },
  };

  return (
    <div>
      <Table
        filterFuncStack={openWithdrawals ? [filterOpenWithdrawals] : []}
        columns={tableColumns}
        tableData={tableData}
        clickRow={!openWithdrawals ? PopupConfigurations : ModalConfigurations}
      />
    </div>
  );
};
