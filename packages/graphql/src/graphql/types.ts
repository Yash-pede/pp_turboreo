import type * as Types from "./schema.types";

export type InsertIntoproduct_BatchesCollectionMutationVariables = Types.Exact<{
  objects:
    | Array<Types.Product_BatchesInsertInput>
    | Types.Product_BatchesInsertInput;
}>;

export type InsertIntoproduct_BatchesCollectionMutation = {
  insertIntoproduct_batchesCollection?: Types.Maybe<{
    records: Array<
      Pick<
        Types.Product_Batches,
        "productId" | "expiryDate" | "price" | "quantity" | "batchNo"
      >
    >;
  }>;
};

export type InsertIntoordersCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.OrdersInsertInput> | Types.OrdersInsertInput;
}>;

export type InsertIntoordersCollectionMutation = {
  insertIntoordersCollection?: Types.Maybe<{
    records: Array<Pick<Types.Orders, "userId" | "productId" | "quantity">>;
  }>;
};

export type UpdateOrdersCollectionMutationVariables = Types.Exact<{
  set: Types.OrdersUpdateInput;
  filter?: Types.InputMaybe<Types.OrdersFilter>;
}>;

export type UpdateOrdersCollectionMutation = {
  updateordersCollection: {
    records: Array<Pick<Types.Orders, "productId" | "quantity" | "status">>;
  };
};

export type InsertIntoproductsCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.ProductsInsertInput> | Types.ProductsInsertInput;
}>;

export type InsertIntoproductsCollectionMutation = {
  insertIntoproductsCollection?: Types.Maybe<{
    records: Array<
      Pick<Types.Products, "name" | "description" | "imageURL" | "updated_at">
    >;
  }>;
};

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
      node: Pick<Types.Products, "id" | "name" | "description" | "imageURL">;
    }>;
  }>;
};

export type AllOrdersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AllOrdersQuery = {
  ordersCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.Orders,
        "id" | "productId" | "quantity" | "status" | "created_at"
      >;
    }>;
  }>;
};

export type Inventory_DistributorConnectionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type Inventory_DistributorConnectionQuery = {
  inventory_distributorCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.Inventory_Distributor,
        "id" | "quantity" | "created_at" | "productId"
      >;
    }>;
  }>;
};

export type Product_BatchesCollectionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type Product_BatchesCollectionQuery = {
  product_batchesCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.Product_Batches,
        "productId" | "price" | "quantity" | "created_at" | "batchNo"
      >;
    }>;
  }>;
};

export type GetProfileByIdAndUserRoleQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ProfilesFilter>;
}>;

export type GetProfileByIdAndUserRoleQuery = {
  profilesCollection?: Types.Maybe<{
    edges: Array<{ node: Pick<Types.Profiles, "id" | "userrole"> }>;
  }>;
};
