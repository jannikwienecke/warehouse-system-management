import React from "react";
import { Table } from "../../baseComponents/Table";
import DetailView from "./DetailView";

export const TableWithdrawals = ({
  tableColumns,
  tableData,
  arrInput,
  fetchData,
  dataType,
  update,
}) => {
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
          btnList: [
            {
              func: (updatedRow) => null,
              triggerName: "update",
              text: "Update",
            },
          ],
        },
      };
    },
  };

  return (
    <div>
      <Table
        columnSelection={["product_name", "row_name", "quantity", "notes"]}
        columns={tableColumns}
        tableData={tableData}
        clickRow={PopupConfigurations}
        onChildUnmounts={() => {
          fetchData();
        }}
      />
    </div>
  );
};
