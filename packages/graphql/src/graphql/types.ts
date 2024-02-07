import type * as Types from "./schema.types";

export type InsertIntoProductsCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.ProductsInsertInput> | Types.ProductsInsertInput;
}>;

export type InsertIntoProductsCollectionMutation = {
  insertIntoPRODUCTSCollection?: Types.Maybe<{
    records: Array<
      Pick<
        Types.Products,
        "name" | "mrp" | "description" | "imageURL" | "created_at"
      >
    >;
  }>;
};

export type InsertIntoStocksCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.StocksInsertInput> | Types.StocksInsertInput;
}>;

export type InsertIntoStocksCollectionMutation = {
  insertIntoSTOCKSCollection?: Types.Maybe<{
    records: Array<
      Pick<
        Types.Stocks,
        | "product_id"
        | "batch_no"
        | "avalable_quantity"
        | "expiry_date"
        | "selling_price"
      >
    >;
  }>;
};

export type InsertIntoordersCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.OrdersInsertInput> | Types.OrdersInsertInput;
}>;

export type InsertIntoordersCollectionMutation = {
  insertIntoORDERSCollection?: Types.Maybe<{
    records: Array<
      Pick<Types.Orders, "user_id" | "quantity" | "product_id" | "batch_no">
    >;
  }>;
};

export type UpdateOrdersCollectionMutationVariables = Types.Exact<{
  set: Types.OrdersUpdateInput;
  filter?: Types.InputMaybe<Types.OrdersFilter>;
}>;

export type UpdateOrdersCollectionMutation = {
  updateORDERSCollection: {
    records: Array<
      Pick<
        Types.Orders,
        "product_id" | "user_id" | "batch_no" | "quantity" | "status"
      >
    >;
  };
};

export type UpdateOrdersCollection_DistributorMutationVariables = Types.Exact<{
  set: Types.OrdersUpdateInput;
  filter?: Types.InputMaybe<Types.OrdersFilter>;
}>;

export type UpdateOrdersCollection_DistributorMutation = {
  updateORDERSCollection: { records: Array<Pick<Types.Orders, "status">> };
};

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

export type PRoductsCollectionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type PRoductsCollectionQuery = {
  pRODUCTSCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<Types.Products, "id" | "mrp" | "imageURL" | "created_at">;
    }>;
  }>;
};

export type STocksCollectionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type STocksCollectionQuery = {
  sTOCKSCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.Stocks,
        | "batch_no"
        | "product_id"
        | "avalable_quantity"
        | "orderd_quantity"
        | "selling_price"
        | "expiry_date"
      >;
    }>;
  }>;
};

export type ORdersCollectionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ORdersCollectionQuery = {
  oRDERSCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<Types.Orders, "quantity" | "status" | "batch_no" | "user_id">;
    }>;
  }>;
};

export type D_InventoryCollectionQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type D_InventoryCollectionQuery = {
  d_INVENTORYCollection?: Types.Maybe<{
    edges: Array<{
      node: Pick<
        Types.D_Inventory,
        | "id"
        | "distributor_id"
        | "product_id"
        | "quantity"
        | "salesperson_id"
        | "batch_no"
      >;
    }>;
  }>;
};
