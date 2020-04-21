import { customers, products } from "../testData";
import { mockAPI, translate } from "../functions/utils";
export const IDENTIFIER = ["id", "value"];

const TYPES = {
  rows: "rows",
  products: "products",
  packagings: "packagings",
  employees: "employees",
  customers: "customers",
  symbuildings: "symbuildings",
  symfactories: "symfactories",
  warehouses: "warehouses",
  compartments: "compartments",
  vehicles: "vehicles",
};

export const INIT_TYPES = [
  TYPES.products,
  TYPES.packagings,
  TYPES.employees,
  TYPES.customers,
  TYPES.symbuildings,
  TYPES.symfactories,
  TYPES.warehouses,
  TYPES.rows,
  TYPES.compartments,
  TYPES.vehicles,
];

export const SET_OPTIONS_BASE_DATA = () => {
  return Object.keys(TYPES).map((key) => {
    return { value: key, label: translate(key) };
  });
};

const setInput = (name, identifier, labelName, funcReturnValue) => {
  let input = Object.assign({}, INPUT_BASE);
  input.name = name;
  input.identifier = identifier;
  input.labelName = labelName;
  input.placeholder = translate(name);

  if (funcReturnValue) {
    input.setOptions = null;
    input.options = funcReturnValue;
  }

  return Object.assign({}, input);
};

export const getInputField = (name, typeColumn) => {
  const handleObjectType = () => {
    input = getField(name);
    if (!input) {
      input = getField(name + "s", name + "s");
    }
    if (!input) {
      input = getField(name.slice(0, -1) + "ies", name.slice(0, -1) + "ies");
    }
  };
  const handleNonObjectTypes = () => {
    input = getField(typeColumn, name);
  };

  let input;
  if (typeColumn === "object") {
    handleObjectType();
  } else {
    handleNonObjectTypes();
  }

  return input;
};

export const getField = (name, nameOverride) => {
  let input = INPUT[name];

  if (typeof input === "function") {
    input = input(nameOverride);
  }
  if (!input) return null;
  return Object.assign({}, input);
};

const INPUT_BASE = {
  name: "",
  placeholder: "",
  type: "input",
  identifier: "value",
  labelName: "label",
  size: 6,
  setOptions: (state, name) => {
    return state.base[name];
  },
};

export const INPUT_DEFAULTS = {
  id: {
    name: "id",
    placeholder: "ID",
    type: "number",
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
    placeholder: "Text",
    type: "text",
    size: 6,
  },
  string: {
    name: "text",
    placeholder: "text",
    type: "text",
    size: 6,
  },
  int: {
    name: "number",
    placeholder: "text",
    type: "number",
    size: 6,
  },
  boolean: (name) => setInput(name, "value", "label", booleanValues),
};

const SET_INPUT_FIELDS = () => {
  let inputs = {};
  Object.keys(TYPES).forEach((key) => {
    let id = key.id ? key.id : "id";
    let name = key.name ? key.name : "name";

    inputs[key] = () => setInput(key, id, name);
  });

  return inputs;
};

export const INPUT = Object.assign(INPUT_DEFAULTS, SET_INPUT_FIELDS());

const booleanValues = [
  { label: "Ja", value: true },
  { label: "Nein", value: false },
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

const toTitleCase = (x) => {
  return x.slice(0, 1).toUpperCase() + x.slice(1);
};
const getSingularUpperCase = (key) => {
  if (key.slice(-3) === "ies") {
    key = key.replace("ies", "y");
  }

  return toTitleCase(key);
};
export const BASE_QUERIES = Object.keys(TYPES).map((type) => {
  return {
    [type]: {
      get: type,
      put: "update" + getSingularUpperCase(type),
      // delete :
    },
  };
});
