export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigFloat: { input: any; output: any };
  BigInt: { input: any; output: any };
  Cursor: { input: any; output: any };
  Date: { input: any; output: any };
  Datetime: { input: any; output: any };
  JSON: { input: any; output: any };
  Opaque: { input: any; output: any };
  Time: { input: any; output: any };
  UUID: { input: any; output: any };
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars["BigFloat"]["input"]>;
  gt?: InputMaybe<Scalars["BigFloat"]["input"]>;
  gte?: InputMaybe<Scalars["BigFloat"]["input"]>;
  in?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["BigFloat"]["input"]>;
  lte?: InputMaybe<Scalars["BigFloat"]["input"]>;
  neq?: InputMaybe<Scalars["BigFloat"]["input"]>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars["BigInt"]["input"]>;
  gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  neq?: InputMaybe<Scalars["BigInt"]["input"]>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars["Date"]["input"]>;
  gt?: InputMaybe<Scalars["Date"]["input"]>;
  gte?: InputMaybe<Scalars["Date"]["input"]>;
  in?: InputMaybe<Array<Scalars["Date"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Date"]["input"]>;
  lte?: InputMaybe<Scalars["Date"]["input"]>;
  neq?: InputMaybe<Scalars["Date"]["input"]>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars["Datetime"]["input"]>;
  gt?: InputMaybe<Scalars["Datetime"]["input"]>;
  gte?: InputMaybe<Scalars["Datetime"]["input"]>;
  in?: InputMaybe<Array<Scalars["Datetime"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Datetime"]["input"]>;
  lte?: InputMaybe<Scalars["Datetime"]["input"]>;
  neq?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type FilterIs = "NOT_NULL" | "NULL";

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<Scalars["Float"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  neq?: InputMaybe<Scalars["Float"]["input"]>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars["ID"]["input"]>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  neq?: InputMaybe<Scalars["Int"]["input"]>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  /** Deletes zero or more records from the `inventory_distributor` collection */
  deleteFrominventory_distributorCollection: Inventory_DistributorDeleteResponse;
  /** Deletes zero or more records from the `orders` collection */
  deleteFromordersCollection: OrdersDeleteResponse;
  /** Deletes zero or more records from the `product_batches` collection */
  deleteFromproduct_batchesCollection: Product_BatchesDeleteResponse;
  /** Deletes zero or more records from the `products` collection */
  deleteFromproductsCollection: ProductsDeleteResponse;
  /** Deletes zero or more records from the `profiles` collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Adds one or more `inventory_distributor` records to the collection */
  insertIntoinventory_distributorCollection?: Maybe<Inventory_DistributorInsertResponse>;
  /** Adds one or more `orders` records to the collection */
  insertIntoordersCollection?: Maybe<OrdersInsertResponse>;
  /** Adds one or more `product_batches` records to the collection */
  insertIntoproduct_batchesCollection?: Maybe<Product_BatchesInsertResponse>;
  /** Adds one or more `products` records to the collection */
  insertIntoproductsCollection?: Maybe<ProductsInsertResponse>;
  /** Adds one or more `profiles` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Updates zero or more records in the `inventory_distributor` collection */
  updateinventory_distributorCollection: Inventory_DistributorUpdateResponse;
  /** Updates zero or more records in the `orders` collection */
  updateordersCollection: OrdersUpdateResponse;
  /** Updates zero or more records in the `product_batches` collection */
  updateproduct_batchesCollection: Product_BatchesUpdateResponse;
  /** Updates zero or more records in the `products` collection */
  updateproductsCollection: ProductsUpdateResponse;
  /** Updates zero or more records in the `profiles` collection */
  updateprofilesCollection: ProfilesUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrominventory_DistributorCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<Inventory_DistributorFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromordersCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OrdersFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromproduct_BatchesCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<Product_BatchesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromproductsCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ProductsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ProfilesFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoinventory_DistributorCollectionArgs = {
  objects: Array<Inventory_DistributorInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoordersCollectionArgs = {
  objects: Array<OrdersInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoproduct_BatchesCollectionArgs = {
  objects: Array<Product_BatchesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoproductsCollectionArgs = {
  objects: Array<ProductsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateinventory_DistributorCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<Inventory_DistributorFilter>;
  set: Inventory_DistributorUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateordersCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<OrdersFilter>;
  set: OrdersUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateproduct_BatchesCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<Product_BatchesFilter>;
  set: Product_BatchesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateproductsCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ProductsFilter>;
  set: ProductsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars["Int"]["input"];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars["ID"]["output"];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars["Opaque"]["input"]>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export type OrderByDirection =
  /** Ascending order, nulls first */
  | "AscNullsFirst"
  /** Ascending order, nulls last */
  | "AscNullsLast"
  /** Descending order, nulls first */
  | "DescNullsFirst"
  /** Descending order, nulls last */
  | "DescNullsLast";

export type PageInfo = {
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

/** The root type for querying data */
export type Query = {
  /** A pagable collection of type `inventory_distributor` */
  inventory_distributorCollection?: Maybe<Inventory_DistributorConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `orders` */
  ordersCollection?: Maybe<OrdersConnection>;
  /** A pagable collection of type `product_batches` */
  product_batchesCollection?: Maybe<Product_BatchesConnection>;
  /** A pagable collection of type `products` */
  productsCollection?: Maybe<ProductsConnection>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
};

/** The root type for querying data */
export type QueryInventory_DistributorCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<Inventory_DistributorFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<Inventory_DistributorOrderBy>>;
};

/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars["ID"]["input"];
};

/** The root type for querying data */
export type QueryOrdersCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OrdersFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OrdersOrderBy>>;
};

/** The root type for querying data */
export type QueryProduct_BatchesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<Product_BatchesFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<Product_BatchesOrderBy>>;
};

/** The root type for querying data */
export type QueryProductsCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<ProductsFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<ProductsOrderBy>>;
};

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  iregex?: InputMaybe<Scalars["String"]["input"]>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
  regex?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars["Time"]["input"]>;
  gt?: InputMaybe<Scalars["Time"]["input"]>;
  gte?: InputMaybe<Scalars["Time"]["input"]>;
  in?: InputMaybe<Array<Scalars["Time"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars["Time"]["input"]>;
  lte?: InputMaybe<Scalars["Time"]["input"]>;
  neq?: InputMaybe<Scalars["Time"]["input"]>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars["UUID"]["input"]>;
  in?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Inventory_Distributor = Node & {
  created_at: Scalars["Datetime"]["output"];
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  product: Products;
  productId: Scalars["UUID"]["output"];
  quantity: Scalars["BigFloat"]["output"];
  userId: Scalars["UUID"]["output"];
};

export type Inventory_DistributorConnection = {
  edges: Array<Inventory_DistributorEdge>;
  pageInfo: PageInfo;
};

export type Inventory_DistributorDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Inventory_Distributor>;
};

export type Inventory_DistributorEdge = {
  cursor: Scalars["String"]["output"];
  node: Inventory_Distributor;
};

export type Inventory_DistributorFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Inventory_DistributorFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Inventory_DistributorFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Inventory_DistributorFilter>>;
  productId?: InputMaybe<UuidFilter>;
  quantity?: InputMaybe<BigFloatFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type Inventory_DistributorInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  productId?: InputMaybe<Scalars["UUID"]["input"]>;
  quantity?: InputMaybe<Scalars["BigFloat"]["input"]>;
  userId?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Inventory_DistributorInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Inventory_Distributor>;
};

export type Inventory_DistributorOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  productId?: InputMaybe<OrderByDirection>;
  quantity?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type Inventory_DistributorUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  productId?: InputMaybe<Scalars["UUID"]["input"]>;
  quantity?: InputMaybe<Scalars["BigFloat"]["input"]>;
  userId?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Inventory_DistributorUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Inventory_Distributor>;
};

export type Orders = Node & {
  created_at: Scalars["Datetime"]["output"];
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  product?: Maybe<Products>;
  productId?: Maybe<Scalars["UUID"]["output"]>;
  quantity: Scalars["BigInt"]["output"];
  status: Orders_Status;
  user?: Maybe<Profiles>;
  userId?: Maybe<Scalars["UUID"]["output"]>;
};

export type OrdersConnection = {
  edges: Array<OrdersEdge>;
  pageInfo: PageInfo;
};

export type OrdersDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Orders>;
};

export type OrdersEdge = {
  cursor: Scalars["String"]["output"];
  node: Orders;
};

export type OrdersFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OrdersFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OrdersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OrdersFilter>>;
  productId?: InputMaybe<UuidFilter>;
  quantity?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<Orders_StatusFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type OrdersInsertInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  productId?: InputMaybe<Scalars["UUID"]["input"]>;
  quantity?: InputMaybe<Scalars["BigInt"]["input"]>;
  status?: InputMaybe<Orders_Status>;
  userId?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type OrdersInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Orders>;
};

export type OrdersOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  productId?: InputMaybe<OrderByDirection>;
  quantity?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type OrdersUpdateInput = {
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  productId?: InputMaybe<Scalars["UUID"]["input"]>;
  quantity?: InputMaybe<Scalars["BigInt"]["input"]>;
  status?: InputMaybe<Orders_Status>;
  userId?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type OrdersUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Orders>;
};

export type Orders_Status =
  | "Cancelled"
  | "Defected"
  | "Fulfilled"
  | "InProcess"
  | "Pending";

/** Boolean expression comparing fields on type "orders_status" */
export type Orders_StatusFilter = {
  eq?: InputMaybe<Orders_Status>;
  in?: InputMaybe<Array<Orders_Status>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Orders_Status>;
};

export type Product_Batches = Node & {
  batchNo: Scalars["String"]["output"];
  created_at: Scalars["Datetime"]["output"];
  expiryDate: Scalars["Date"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  price: Scalars["BigInt"]["output"];
  product: Products;
  productId: Scalars["UUID"]["output"];
  quantity: Scalars["BigInt"]["output"];
};

export type Product_BatchesConnection = {
  edges: Array<Product_BatchesEdge>;
  pageInfo: PageInfo;
};

export type Product_BatchesDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Product_Batches>;
};

export type Product_BatchesEdge = {
  cursor: Scalars["String"]["output"];
  node: Product_Batches;
};

export type Product_BatchesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Product_BatchesFilter>>;
  batchNo?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  expiryDate?: InputMaybe<DateFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Product_BatchesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Product_BatchesFilter>>;
  price?: InputMaybe<BigIntFilter>;
  productId?: InputMaybe<UuidFilter>;
  quantity?: InputMaybe<BigIntFilter>;
};

export type Product_BatchesInsertInput = {
  batchNo?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  expiryDate?: InputMaybe<Scalars["Date"]["input"]>;
  price?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId?: InputMaybe<Scalars["UUID"]["input"]>;
  quantity?: InputMaybe<Scalars["BigInt"]["input"]>;
};

export type Product_BatchesInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Product_Batches>;
};

export type Product_BatchesOrderBy = {
  batchNo?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  expiryDate?: InputMaybe<OrderByDirection>;
  price?: InputMaybe<OrderByDirection>;
  productId?: InputMaybe<OrderByDirection>;
  quantity?: InputMaybe<OrderByDirection>;
};

export type Product_BatchesUpdateInput = {
  batchNo?: InputMaybe<Scalars["String"]["input"]>;
  created_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  expiryDate?: InputMaybe<Scalars["Date"]["input"]>;
  price?: InputMaybe<Scalars["BigInt"]["input"]>;
  productId?: InputMaybe<Scalars["UUID"]["input"]>;
  quantity?: InputMaybe<Scalars["BigInt"]["input"]>;
};

export type Product_BatchesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Product_Batches>;
};

export type Products = Node & {
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  imageURL?: Maybe<Scalars["String"]["output"]>;
  inventory_distributorCollection?: Maybe<Inventory_DistributorConnection>;
  name: Scalars["String"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  ordersCollection?: Maybe<OrdersConnection>;
  product_batchesCollection?: Maybe<Product_BatchesConnection>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
};

export type ProductsInventory_DistributorCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<Inventory_DistributorFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<Inventory_DistributorOrderBy>>;
};

export type ProductsOrdersCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OrdersFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OrdersOrderBy>>;
};

export type ProductsProduct_BatchesCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<Product_BatchesFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<Product_BatchesOrderBy>>;
};

export type ProductsConnection = {
  edges: Array<ProductsEdge>;
  pageInfo: PageInfo;
};

export type ProductsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Products>;
};

export type ProductsEdge = {
  cursor: Scalars["String"]["output"];
  node: Products;
};

export type ProductsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProductsFilter>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  imageURL?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProductsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProductsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ProductsInsertInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  imageURL?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type ProductsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Products>;
};

export type ProductsOrderBy = {
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  imageURL?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ProductsUpdateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  imageURL?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
};

export type ProductsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Products>;
};

export type Profiles = Node & {
  email?: Maybe<Scalars["String"]["output"]>;
  full_name?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  /** Globally Unique Record Identifier */
  nodeId: Scalars["ID"]["output"];
  ordersCollection?: Maybe<OrdersConnection>;
  role?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["Datetime"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
  userrole?: Maybe<User_Roles>;
};

export type ProfilesOrdersCollectionArgs = {
  after?: InputMaybe<Scalars["Cursor"]["input"]>;
  before?: InputMaybe<Scalars["Cursor"]["input"]>;
  filter?: InputMaybe<OrdersFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Array<OrdersOrderBy>>;
};

export type ProfilesConnection = {
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  cursor: Scalars["String"]["output"];
  node: Profiles;
};

export type ProfilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProfilesFilter>>;
  email?: InputMaybe<StringFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProfilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProfilesFilter>>;
  role?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  username?: InputMaybe<StringFilter>;
  userrole?: InputMaybe<User_RolesFilter>;
};

export type ProfilesInsertInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  full_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  userrole?: InputMaybe<User_Roles>;
};

export type ProfilesInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  email?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  role?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
  userrole?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  full_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  updated_at?: InputMaybe<Scalars["Datetime"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
  userrole?: InputMaybe<User_Roles>;
};

export type ProfilesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars["Int"]["output"];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type User_Roles =
  | "ADMIN"
  | "CUSTOMER"
  | "DISTRIBUTORS"
  | "SUPERADMIN"
  | "UNDEFINED";

/** Boolean expression comparing fields on type "user_roles" */
export type User_RolesFilter = {
  eq?: InputMaybe<User_Roles>;
  in?: InputMaybe<Array<User_Roles>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<User_Roles>;
};
