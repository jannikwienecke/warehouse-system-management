import React from "react";
import { useGraphqlApi } from "../functions/hooks.js/useGraphqlApi";
import ModularTable from "../components/table/ModularTable";
import { myDictonary } from "../functions/utils";
import { Table } from "../baseComponents/Table";
import DetailView from "./DetailView";

export const GraphqlTable = ({
  tableColumns,
  tableData,
  arrInput,
  fetchData,
  dataType,
}) => {
  return (
    <div>
      <Table
        columns={tableColumns}
        tableData={tableData}
        clickRow={{
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
        }}
      />
    </div>
  );
};
