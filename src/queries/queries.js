import { queryBuilder } from "./queryBuilder";

export const QUERY_DICT = {
  products: {
    query: "products",
    mutation: "updateProduct",
  },
  packagings: {
    query: "packagings",
    mutation: "updatePackaging",
  },
};

export const RETURN_VALUES = {
  products: `
      id
      name
      productNumber
      threeInRow
      packaging {
        name
      }
      notesPicking
      notesPutaway
  `,
  packagings: `
    id
    name
    length
    width
`,
};

export const INIT_QUERY = queryBuilder([
  { modelName: "products" },
  { modelName: "packagings" },
]);
