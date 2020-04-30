import React, { useEffect, useState } from "react";
import { Parent } from "../../baseComponents/Parent";
import { COLUMNS } from "../../baseComponents/base";
import { copy } from "./helper";
import { Table } from "../../baseComponents/Table";

export const condenseTruckLoading = (trucks) => {
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
    console.log("pallet", pallet);

    const identifier =
      pallet.productId + "_" + pallet.rowId + "_" + pallet.buildingId;
    // const orderNum = pallet.id.slice(0, 1);
    if (identifier in orders) {
      orders[identifier].push(pallet);
    } else {
      orders[identifier] = [pallet];
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

  return trucks;
};

export const PalletsTableView = ({ trucks }) => {
  const [trucksUpdated, setTrucksUpadated] = useState(null);

  useEffect(() => {
    if (trucks) {
      setTrucksUpadated(condenseTruckLoading(trucks));
    }
  }, [trucks]);

  if (!trucksUpdated) return <>Loading</>;

  const truckTableList = () => {
    console.log("truck", trucksUpdated);

    return trucksUpdated.map((truck) => {
      return (
        <Table
          tableData={truck.condensedOrders}
          columns={columns}
          minHeight="0vh"
        />
      );
    });
  };

  return (
    <div className="mb-5">
      <h1>Tourenliste</h1>
      {truckTableList()}
    </div>
  );
};

const columns = [
  { accessor: "productName", Header: "Produkt" },
  { accessor: "rowName", Header: "Reihe" },
  { accessor: "buildingName", Header: "Gebäude" },
  { accessor: "factoryName", Header: "Werk" },
  { accessor: "quantity", Header: "Anzahl" },
];
