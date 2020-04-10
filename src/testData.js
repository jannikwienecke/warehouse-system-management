import { EURO, INDUSTRY } from "./auslagerung/createTour/constants";

export const products = [
  {
    id: 1,
    product_id: "227445",
    product_name: "Flachkannen",
    type: EURO,
  },
  {
    id: 2,
    product_id: "223657",
    product_name: "Polykanister",
    type: EURO,
  },
  {
    id: 3,
    product_id: "2297500",
    product_name: "CP3 Paletten",
    type: INDUSTRY,
  },
];

export const customers = [
  {
    id: 1,
    customer_id: "37HOSTIE",
    customer_name: "Stitebel Eltron",
  },
  {
    id: 2,
    customer_id: "57ERAST00",
    customer_name: "AST",
  },
];

export const einlagerungen = [
  {
    id: 1,
    customer_id: "37HOSTIE00",
    product_id: 2274254,
    product_name: "Flachkannen",
    quantity: 300,
    datetime: "2020-04-03 16:01:00",
    employee_name: "Fricke, Torben",
    employee_id: 1,
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
    employee_name: "Fricke, Torben",
    employee_id: 1,
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
    employee_id: null,
    employee_name: null,
    storage: "Brücke",
    row_name: "Br. 122",
    row_id: 3,
    notes: "",
  },
];

export const auslagerungen = [
  {
    id: 1,
    customer_id: "37HOSYMR00",
    product_id: 2274254,
    product_name: "Flachkannen",
    quantity: 300,
    datetime: "2020-04-03 15:01:00",
    employee_name: "Spadi, Victor",
    employee_id: 5,
    storage: "Halle 2",
    row_name: "C42",
    row_id: 1,
    notes: "",
    tour_id: 1,
    tour_number: 1,
  },
  {
    id: 2,
    customer_id: "37HOSYMR00",
    product_id: 2274252,
    product_name: "Europaletten",
    quantity: 119,
    datetime: "2020-04-03 15:01:00",
    employee_name: "Spadi, Victor",
    employee_id: 5,
    storage: "Halle 4",
    row_name: "D5",
    row_id: 2,
    notes: "",
    tour_id: 1,
    tour_number: 1,
  },
  {
    id: 3,
    customer_id: "37HOSYMR00",
    product_id: 2274252,
    product_name: "Europaletten",
    quantity: 119,
    datetime: "2020-04-03 17:01:00",
    employee_name: "Hein, Robert",
    employee_id: 5,
    storage: "Halle 4",
    row_name: "D5",
    row_id: 2,
    notes: "",
    tour_id: 2,
    tour_number: 2,
  },
  {
    id: 4,
    customer_id: "37HOSYMR00",
    product_id: 2274252,
    product_name: "Europaletten",
    quantity: 119,
    datetime: "2020-04-03 17:01:00",
    employee_name: "Hein, Robert",
    employee_id: 5,
    storage: "Halle 4",
    row_name: "D5",
    row_id: 2,
    notes: "",
    tour_id: 2,
    tour_number: 2,
  },
];

export const storageBridges = [
  { bridge_id: "01", bridge_number: "Brücke Nr. 1", isEmpty: true },
  { bridge_id: "122", bridge_number: "Brücke Nr.122", isEmpty: true },
  {
    bridge_id: "222",
    bridge_number: "Brücke Nr.222",
    isEmpty: false,
    prduct_id: 2790000,
    datetime: "2020-01-01 12:00:00",
    type_id: 1,
  },
];

export const storage = [
  {
    row_id: 1,
    row_name: "C42",
    storage: 3,
    open: 10,
    isEmpty: false,
    isFull: false,
  },
  {
    row_id: 2,
    row_name: "C38",
    storage: 3,
    open: 100,
    isEmpty: true,
    isFull: false,
  },
  {
    row_id: 4,
    row_name: "D22",
    storage: 4,
    open: 500,
    isEmpty: true,
    isFull: false,
  },
];

export const employees = [
  { employee_id: "1", employee_name: "Fricke, Torben" },
  { employee_id: "2", employee_name: "Jagata, Maurice" },
  { employe__id: "3", employee_name: "Sylla, Ibrahima" },
];

export const symBuildings = [
  { symBuilding_id: "1", symBuilding_name: "X442", symFactory_id: 1 },
  { symBuilding_id: "2", symBuilding_name: "C50", symFactory_id: 2 },
  { symBuilding_id: "3", symBuilding_name: "Y500", symFactory_id: 1 },
];
