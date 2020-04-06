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
    setOptions: (options) => options[INPUT.customers.name],
    func: (state) => {
      return {
        name: INPUT.customers.name,
        data: state.base[INPUT.customers.name],
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
    //   func: (state) => {
    //     return {
    //       name: INPUT.products.name,
    //       data: state.base[INPUT.products.name],
    //     };
    //   },
    // },

    func: (name) =>
      mockAPI(products, 2000).then((res) => {
        return {
          data: res.data,
          name: INPUT.products.name,
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
var BreakException = {};
export const EXCEPTIONS = {
  ValidationException,
  ParseException,
  BreakException,
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
