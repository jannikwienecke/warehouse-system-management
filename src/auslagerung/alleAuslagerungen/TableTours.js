import React from "react";
import { Table } from "../../baseComponents/Table";
import { ValidationModal } from "./ValidationModal";

export const TableTours = ({
  tableColumns,
  tableData,
  arrInput,
  fetchData,
  dataType,
  update,
}) => {
  return (
    <div>
      <Table
        columns={tableColumns}
        tableData={tableData}
        clickRow={{
          func: (rowData) => {
            return {
              children: <ValidationModal tour={rowData} />,
              props: {
                header: "HEADDER NAME",
                type: "Modal",
                height: "80vh",
                heightHeader: "35%",
                header: "Detail Ansicht",
                btnList: [
                  {
                    func: () => update(rowData),
                    triggerName: "update",
                    text: "Anpassen",
                  },
                ],
              },
            };
          },
        }}
      />
    </div>
  );
};
