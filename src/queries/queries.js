import { queryBuilder } from "./queryBuilder";
import gql from "graphql-tag";

export const QUERY_TRANSLATE = {
  get: "query",
  put: "mutation",
  delete: "mutation",
  post: "mutation",
};
export const QUERY_DICT = {
  products: {
    get: "products",
    put: "updateProduct",
    delete: "deleteProduct",
    post: "createProduct",
  },

  packagings: {
    get: "packagings",
    put: "updatePackaging",
    delete: "deletePackaging",
    post: "createPackaging",
  },
  employees: {
    get: "employees",
    // put: "updatePackaging",
    // delete: "deletePackaging",
    post: "createEmployee",
  },
  __schema: {
    get: "__schema",
  },
};

export const nullQuery = gql`
  query {
    test
  }
`;

export const nullMutation = gql`
  mutation {
    test
  }
`;

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
  employees: `
    id
    name

`,
  __schema: `
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    
  
`,
};

export const INIT_QUERY = () =>
  queryBuilder([
    { modelName: "products" },
    { modelName: "packagings" },
    { modelName: "employees" },
    { modelName: "__schema" },
  ]);
