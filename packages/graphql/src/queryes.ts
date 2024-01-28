import gql from "graphql-tag";

export const TEST_QUERY = gql`
  query TestQuery {
    __typename
  }
`;

export const PROFILES_QUERY = gql`
  query Profiles(
    $filter: profilesFilter!
    $first: Int!
    $last: Int!
    $before: Cursor!
    $after: Cursor!
  ) {
    profilesCollection(
      filter: $filter
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      edges {
        node {
          id
          username
          email
          full_name
          role
          userrole
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_QUERY = gql`
  query allproducts {
    productsCollection {
      edges {
        node {
          id
          name
          price
          description
          imageURL
        }
      }
    }
  }
`;

export const ALL_ORDERS_QUERY = gql`
  query allOrders {
    ordersCollection {
      edges {
        node {
          id
          productId
          quantity
          status
          created_at
        }
      }
    }
  }
`;

export const ALL_INVENTORY_DISTRIBUTOR_QUERY = gql`
  query inventory_distributorConnection {
    inventory_distributorCollection {
      edges {
        node {
          id
          quantity
          created_at
          productId
        }
      }
    }
  }
`;

export const ALL_PRODUCT_BATCHES_QUERY = gql`
  query product_batchesCollection {
    product_batchesCollection {
      edges {
        node {
          productId
          quantity
          created_at
          batchNo
        }
      }
    }
  }
`;

export const GET_USER_ROLE_QUERY = gql`
  query GetProfileByIdAndUserRole($filter: profilesFilter) {
    profilesCollection(filter: $filter) {
      edges {
        node {
          id
          userrole
        }
      }
    }
  }
`;
