import { queryBuilder } from "./queryBuilder";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findModelSchema } from "../functions/utils";
import { useQuery } from "react-apollo";
import { setSchema, setInitData } from "../baseComponents/store/actions";

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

const INIT_TYPES = ["products", "packagings", "employees"];

export const useInitQuery = (store) => {
  const [currentSchema, setCurrentSchema] = useState(null);
  const [query, setQuery] = useState(nullQuery);
  const { data, loading, error } = useQuery(query);
  const [__schema, set__schema] = useState(null);
  const [loadingInitData, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.__schema) {
      store.dispatch(setSchema(data.__schema));
      set__schema(data.__schema);
    } else if (data) {
      saveData();
    }
  }, [data]);

  useEffect(() => {
    if (store.dispatch) {
      _setQuery();
    }
  }, [store.dispatch]);

  useEffect(() => {
    if (__schema) {
      setSchemas();
    }
  }, [__schema]);

  useEffect(() => {
    if (currentSchema) {
      fetchData();
    }
  }, [currentSchema]);

  const setSchemas = () => {
    var schemaMapper = {};
    INIT_TYPES.forEach((type) => {
      const schema = findModelSchema(type, __schema);
      schemaMapper[type] = schema;
    });

    setCurrentSchema(schemaMapper);
  };

  const _setQuery = () => {
    const query = queryBuilder([{ modelName: "__schema" }], "get", "__schema");

    setQuery(query);
  };

  const fetchData = () => {
    const listTypes = INIT_TYPES.map((type) => {
      return { modelName: type };
    });
    const query = queryBuilder(listTypes, "get", currentSchema);

    setQuery(query);
  };

  const saveData = () => {
    store.dispatch(
      setInitData({
        ...data,
        currentSchema,
      })
    );
    setLoading(false);
  };

  return { loadingInitData };
};
