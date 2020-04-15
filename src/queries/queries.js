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
