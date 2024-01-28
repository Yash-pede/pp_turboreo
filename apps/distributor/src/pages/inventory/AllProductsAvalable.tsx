import { useGo, useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY, ALL_PRODUCT_BATCHES_QUERY } from "@repo/graphql";
import { ProductCard } from "@repo/ui";
import {
  Button,
  Card,
  Flex,
} from "antd";
import { IconShoppingCart } from "@tabler/icons-react";
export const AllAvalableProducts = () => {
  const { data:StockInventory, isLoading } = useList({
    resource: "product_batches",
    meta: {
      gqlQuery: ALL_PRODUCT_BATCHES_QUERY,
    },
  });
 const {data} = useList({
   resource: "products",
   meta: {
     gqlQuery: ALL_PRODUCTS_QUERY,
   },
   filters: [
     {
       field: "id",
       operator: "in",
       value: StockInventory?.data?.map((item) => item.productId),
     }
   ]
 })
  const go = useGo();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
      </div>
    );
  }

  return (
    <div style={{ gap: "15px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{
            gap: "15px",
            marginTop: "15px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            go({
              to: { resource: "orders", action: "list" },
              type: "push",
              options: {
                keepQuery: true,
              },
            })
          }
        >
          <IconShoppingCart /> Orders
        </Button>
      </div>
      <Flex
        wrap="wrap"
        gap="small"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.data.map((product: any) => (
          <ProductCard
            product={product}
            isLoading={isLoading}
            key={product.id}
            WhereToAdd={"orders"}
          />
        ))}
      </Flex>
    </div>
  );
};
