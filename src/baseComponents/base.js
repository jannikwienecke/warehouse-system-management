import { customers, products } from "../testData";
import { mockAPI } from "../functions/utils";
export const IDENTIFIER = ["id", "value"];

// const FIELDS
export const INPUT = {
  storage: {
    type: "input",
    name: "storage",
    identifier: "row_id",
    labelName: "row_name",
    placeholder: "Lagerplatz",
    setOptions: (options) => options[INPUT.storage.name],
    func: (state) => {
      return {
        name: INPUT.storage.name,
        data: state.base[INPUT.storage.name],
      };
    },
  },
  storageBridges: {
    type: "input",
    name: "storageBridges",
    identifier: "bridge_id",
    labelName: "bridge_number",
    placeholder: "Brücke",
    setOptions: (options) => options[INPUT.storageBridges.name],
    func: (state) => {
      return {
        name: INPUT.storageBridges.name,
        data: state.base[INPUT.storageBridges.name],
      };
    },
  },
  customers: {
    type: "input",
    name: "customers",
    identifier: "customer_id",
    labelName: "customer_name",
    placeholder: "Kunde",
    setOptions: (options) => options[INPUT.customers.name],
    func: (state) => {
      return {
        name: INPUT.customers.name,
        data: state.base[INPUT.customers.name],
      };
    },
  },
  employees: {
    type: "input",
    name: "employees",
    identifier: "employee_id",
    labelName: "employee_name",
    placeholder: "Mitarbeiter",
    setOptions: (options) => options[INPUT.employees.name],
    func: (state) => {
      return {
        name: INPUT.employees.name,
        data: state.base[INPUT.employees.name],
      };
    },
  },

  symBuildings: {
    type: "input",
    name: "symBuildings",
    identifier: "symBuilding_id",
    labelName: "symBuilding_name",
    placeholder: "SYM Gebäude",
    setOptions: (options) => options[INPUT.symBuildings.name],
    func: (state) => {
      return {
        name: INPUT.symBuildings.name,
        data: state.base[INPUT.symBuildings.name],
      };
    },
  },

  products: {
    type: "input",
    name: "products",
    identifier: "id",
    labelName: "name",
    placeholder: "Produkt",
    setOptions: (options, name) => options[name],
    func: (state) => {
      return {
        name: INPUT.products.name,
        data: state.base[INPUT.products.name],
      };
    },
  },

  packagings: {
    type: "input",
    name: "packagings",
    identifier: "id",
    labelName: "name",
    placeholder: "Verpachung",
    setOptions: (options, name) => options[name],
    func: (state) => {
      return {
        name: INPUT.packagings.name,
        data: state.base[INPUT.packagings.name],
      };
    },
  },

  dateStart: {
    name: "dateStart",
    placeholder: "Datum Beginn",
    type: "date",
    size: 6,
  },
  dateEnd: {
    name: "dateEnd",
    placeholder: "Datum Ende",
    type: "date",
    size: 6,
  },
  quantity: {
    name: "quantity",
    placeholder: "Anzahl",
    type: "number",
    size: 6,
  },
  notes: {
    name: "notes",
    placeholder: "Anmerkungen",
    type: "text",
    size: 6,
  },
  datetime: {
    name: "datetime",
    placeholder: "Datum",
    type: "date",
    size: 6,
  },
  text: {
    name: "text",
    placeholder: "text",
    type: "text",
    size: 6,
  },
  string: {
    name: "text",
    placeholder: "text",
    type: "text",
    size: 6,
  },
  number: {
    name: "text",
    placeholder: "text",
    type: "number",
    size: 6,
  },
  boolean: {
    name: "boolean1",
    placeholder: "text",
    type: "input",
    size: 6,
    identifier: "value",
    labelName: "label",
    setOptions: (options) => options[INPUT.boolean.name],
    func: (state) => {
      return {
        name: INPUT.boolean.name,
        data: booleanValues,
      };
    },
  },
};

const booleanValues = [
  { label: "Auswählen", value: true },
  { label: "Nicht Auswählen", value: false },
];

var ValidationException = {};
var ParseException = {};
var BreakException = {};
export const EXCEPTIONS = {
  ValidationException,
  ParseException,
  BreakException,
};

export const COLUMNS = {
  id: ["Nr.", "id"],
  datetime: ["Datum", "datetime"],
  customer: ["Kunden ID", "customer_id"],
  product: ["Produkt ID", "product_id"],
  quantity: ["Stück", "quantity"],
  einlagerer: ["Mitarbeiter", "employee_name"],
  warehouse: ["Lager", "warehouse_name"],
  row: ["Lagerplatz", "row_name"],
  open: ["Verfügbar", "open"],
  isEmptyRow: ["Leer?", "isEmpty"],
  isFullRow: ["Voll?", "isFull"],
  tour: ["Tour Nr.", "tour_id"],
  driver: ["Fahrer", "employee_id"],
  type: ["Type", "type"],
  building: ["Gebäude", "building"],
  factory: ["Werk", "factory"],
};

export const INPUT_TYPES = {
  products: {
    products: INPUT.products,
  },
};
