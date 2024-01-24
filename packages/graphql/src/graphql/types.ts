import type * as Types from "./schema.types";

export type TestQueryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TestQueryQuery = { __typename: "Query" };

export type ProfilesQueryVariables = Types.Exact<{
  filter: Types.ProfilesFilter;
  first: Types.Scalars["Int"]["input"];
  last: Types.Scalars["Int"]["input"];
  before: Types.Scalars["Cursor"]["input"];
  after: Types.Scalars["Cursor"]["input"];
}>;

export type ProfilesQuery = {
  profilesCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.Profiles,
        "id" | "username" | "email" | "full_name" | "role" | "userrole"
      >;
    }>;
  }>;
};

export type AllproductsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AllproductsQuery = {
  productsCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.Products,
        "id" | "name" | "price" | "description" | "imageURL"
      >;
    }>;
  }>;
};
