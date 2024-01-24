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
