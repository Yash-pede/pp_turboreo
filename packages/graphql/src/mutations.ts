import gql from "graphql-tag";

export const INSERT_PRODUCT_BATCHES_MUTATION = gql`
  mutation insertIntoproduct_batchesCollection(
    $objects: [product_batchesInsertInput!]!
  ) {
    insertIntoproduct_batchesCollection(objects: $objects) {
      records {
        productId
        expiryDate
        quantity
        batchNo
      }
    }
  }
`;

export const INSERT_ORDER_MUTATION = gql`
  mutation insertIntoordersCollection(
    $objects: [insertIntoordersCollection!]!
  ) {
    insertIntoordersCollection(objects: $objects) {
      records {
        userId
        productId
        quantity
      }
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation updateOrdersCollection(
    $set: ordersUpdateInput!
    $filter: ordersFilter
  ) {
    updateordersCollection(set: $set, filter: $filter) {
      records {
        productId
        quantity
        status
      }
    }
  }
`;
