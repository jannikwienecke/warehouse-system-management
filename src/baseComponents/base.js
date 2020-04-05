import { customers, products } from "../testData";
import { mockAPI } from "../functions/utils";
export const IDENTIFIER = ["id", "value"];

export const INPUT = {
  customers: {
    type: "input",
    name: "customers",
    identifier: "id",
    labelName: "name",
    placeholder: "Kunde",
    setOptions: (options, name) => options[name],
    func: (name) =>
      mockAPI(customers).then((res) => {
        return {
          data: res.data,
          name: name,
        };
      }),
  },
  products: {
    type: "input",
    name: "products",
    identifier: "id",
    labelName: "name",
    placeholder: "Produkt",
    setOptions: (options, name) => options[name],
    func: (name) =>
      mockAPI(products).then((res) => {
        return {
          data: res.data,
          name: name,
        };
      }),
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
};

var ValidationException = {};
var ParseException = {};
export const EXCEPTIONS = {
  ValidationException,
  ParseException,
};

export const COLUMNS = {
  datetime: ["Datum", "datetime"],
  customer: ["Kunden ID", "customer_id"],
  product: ["Produkt ID", "product_id"],
  quantity: ["Stück", "quantity"],
  einlagerer: ["Einlagerer", "einlagerer_name"],
  storage: ["Lager", "storage"],
  row: ["Lagerplatz", "row_name"],
};
