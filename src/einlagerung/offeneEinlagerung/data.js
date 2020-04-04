export const data = [
  {
    id: 1,
    customer_id: "37HOSTIE00",
    product_id: 2274254,
    product_name: "Flachkannen",
    quantity: 300,
    datetime: "2020-04-03 16:01:00",
    einlagerer_name: "Fricke, Torben",
    einlagerer_id: 1,
    storage: "Halle 2",
    row_name: "C42",
    row_id: 1,
    notes: "",
  },
  {
    id: 2,
    customer_id: "47MOPETE00",
    product_id: 235800,
    product_name: "Polykanister EVOH",
    quantity: 260,
    datetime: "2020-04-03 14:01:00",
    einlagerer_name: "Fricke, Torben",
    einlagerer_id: 1,
    storage: "Halle 3 / Halle 2",
    row_name: "C38",
    row_id: 2,
    notes: "",
  },
  {
    id: 3,
    customer_id: "37HOSYMR00",
    product_id: 279000,
    product_name: "Sickenfässer Palettiert",
    quantity: 192,
    datetime: "2020-04-03 14:01:00",
    einlagerer_id: null,
    einlagerer_name: null,
    storage: "Brücke",
    row_name: "Br. 122",
    row_id: 3,
    notes: "",
  },
];
export const testRows = [
  { value: 1, label: "C42", storage: 3, open: 10, isEmpty: false },
  { value: 2, label: "C38", storage: 3, open: 100, isEmpty: true },
  { value: 4, label: "D22", storage: 4, open: 500, isEmpty: true },
];

export const columns = [
  {
    Header: "Datum",
    accessor: "datetime", // accessor is the "key" in the data
  },
  //   {
  //     Header: "ID",
  //     accessor: "id", // accessor is the "key" in the data
  //   },
  {
    Header: "Kunden ID",
    accessor: "customer_id",
  },
  {
    Header: "Produkt ID",
    accessor: "product_id", // accessor is the "key" in the data
  },
  {
    Header: "Produkt",
    accessor: "product_name", // accessor is the "key" in the data
  },
  {
    Header: "Stück",
    accessor: "quantity", // accessor is the "key" in the data
  },
  {
    Header: "Einlagerer",
    accessor: "einlagerer", // accessor is the "key" in the data
  },
  {
    Header: "Lager",
    accessor: "storage", // accessor is the "key" in the data
  },
  {
    Header: "Lagerplatz",
    accessor: "row_name", // accessor is the "key" in the data
  },
];
