import gql from "graphql-tag";

export const INIT_QUERY = gql`
  query {
    products {
      id
      name
      productNumber
      notesPicking
      notesPutaway
      threeInRow
      createdBy {
        username
      }
      packaging {
        name
        length
        width
      }
    }

    packagings {
      id
      name
      length
      width
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ProductQuery(
    $search: String
    $name: String
    $productNumber: String
    $packagingId: Int
    $threeInRow: Boolean
    $id: Int
    $notesPicking: String
    $notesPutaway: String
  ) {
    products(
      search: $search
      name: $name
      productNumber: $productNumber
      packagingId: $packagingId # productNumber: $productNumber
      threeInRow: $threeInRow
      id: $id
      notesPicking: $notesPicking
      notesPutaway: $notesPutaway
    ) {
      id
      name
      productNumber
      notesPicking
      notesPutaway
      threeInRow
      createdBy {
        username
      }
      packaging {
        name
        length
        width
      }
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation(
    $name: String
    $productNumber: String
    $packagingId: Int
    $threeInRow: Boolean
    $id: Int
    $notesPicking: String
    $notesPutaway: String
  ) {
    updateProduct(
      name: $name
      productNumber: $productNumber
      packagingId: $packagingId # productNumber: $productNumber
      threeInRow: $threeInRow
      id: $id
      notesPicking: $notesPicking
      notesPutaway: $notesPutaway
    ) {
      name
      productNumber
      threeInRow
      notesPicking
      notesPutaway
      packaging {
        name
      }
    }
  }
`;

export const PACKAGING_QUERY = gql`
  query PackagingQuery(
    $search: String
    $id: Int
    $name: String
    $width: Int
    $length: Int
  ) {
    packagings(
      search: $search
      id: $id
      name: $name
      width: $width
      length: $length
    ) {
      id
      name
      width
      length
    }
  }
`;

export const UPDATE_PACKAGING_MUTATION = gql`
  mutation UpdatePackagingMuttion(
    $id: Int
    $name: String
    $width: Int
    $length: Int
  ) {
    updatePackaging(id: $id, name: $name, width: $width, length: $length) {
      id
      name
      width
      length
    }
  }
`;

export const QUERY_DICT = {
  products: {
    query_: PRODUCT_QUERY,
    update_: UPDATE_PRODUCT_MUTATION,
  },
  packagings: {
    query_: PACKAGING_QUERY,
    update_: UPDATE_PACKAGING_MUTATION,
  },
};
