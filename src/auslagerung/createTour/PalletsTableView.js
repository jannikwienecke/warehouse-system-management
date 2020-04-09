import React, { useEffect, useState } from "react";
import { Parent } from "../../baseComponents/Parent";
import { COLUMNS } from "../../baseComponents/base";
import { copy } from "./helper";

const columns = [
  COLUMNS.id,
  COLUMNS.product,
  COLUMNS.quantity,
  COLUMNS.building,
  COLUMNS.factory,
  COLUMNS.type,
];

// 0: {id: "0_0", type: "euro", product_id: "227445", quantity: 3, factory: "1", …}
// 1: {id: "0_1", type: "euro", product_id: "227445", quantity: 3, factory: "1", …}
// 2: {id: "0_2", type: "euro", product_id: "227445", quantity: 3, factory: "1", …}

export const PalletsTableView = ({ trucks }) => {
  const [trucksUpdated, setTrucksUpadated] = useState(null);

  useEffect(() => {
    if (trucks) condenseTruckLoading();
  }, [trucks]);

  const condenseTruckLoading = () => {
    const updateTruck = () => {
      currentTruck["condensedOrders"] = Object.keys(orders).map((key) => {
        var order = orders[key];
        var orderItem = copy(order[0]);
        orderItem["quantity"] = order.length;
        orderItem["id"] = key;
        return orderItem;
      });
    };

    const condense = (pallet) => {
      const orderNum = pallet.id.slice(0, 1);
      if (orderNum in orders) {
        orders[orderNum].push(pallet);
      } else {
        orders[orderNum] = [pallet];
      }
    };

    var orders = {};
    var currentTruck = null;
    trucks.forEach((truck) => {
      currentTruck = truck;
      truck.pallets
        .filter((pallet) => pallet.id)
        .forEach((pallet) => {
          condense(pallet);
        });
      updateTruck();
      orders = {};
    });
    setTrucksUpadated(trucks);
  };

  if (!trucksUpdated) return <>Loading</>;

  console.log("TRUCK FINAL ===", trucksUpdated);

  const truckTableList = () => {
    return trucksUpdated.map((truck) => {
      return (
        <Parent
          table={{
            columnsArr: columns,
            data: truck.condensedOrders,
            //   initFunc: (dispatch) => dispat()),
            middleware: [(data) => console.log("DATA VALIDATION")],
            clickRow: {
              func: (rowData) => console.log("ROW ", rowData),
              // func: (rowData) => <DetailView rowData={rowData} />,
              // baseComponent: {
              //   type: "Popup",
              //   settings: {
              //     height: "80vh",
              //     heightHeader: "35%",
              //   },
              // },
            },
          }}
        />
      );
    });
  };

  return truckTableList();
};
