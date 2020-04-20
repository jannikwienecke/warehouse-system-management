import { customers, products } from "../testData";
import { mockAPI, translate } from "../functions/utils";
export const IDENTIFIER = ["id", "value"];

const setInput = (name, identifier, labelName, funcReturnValue) => {
  let input = Object.assign({}, INPUT.INPUT_BASE);
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
    if (!input) input = getField(name + "s", name + "s");
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

export const INPUT = {
  INPUT_BASE: {
    name: "",
    placeholder: "",
    type: "input",
    identifier: "value",
    labelName: "label",
    size: 6,
    setOptions: (state, name) => {
      return state.base[name];
    },
  },
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

  products: () => setInput("products", "id", "name"),
  employees: () => setInput("employees", "id", "name"),
  packagings: () => setInput("packagings", "id", "name"),
  boolean: (name) => setInput(name, "value", "label", booleanValues),

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
    placeholder: "TEST TEXT!!!!",
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
};

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

export const OPTIONS_BASE_DATA = [
  { value: "products", label: "Produkte" },
  { value: "packagings", label: "Verpackungen" },
  { value: "employees", label: "Mitarbeiter" },
];
