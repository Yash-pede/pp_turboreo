import { useGo, useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY } from "@repo/graphql";
import { ProductCard } from "./ProductCard";
import { Button, Card, Flex } from "antd";
import { IconShoppingCart } from "@tabler/icons-react";

export const AllProducts = ({ whereToAdd }: { whereToAdd?: string }) => {
  const { data, isLoading } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
  });
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
    <div style={{ position: "relative" }}>
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
            WhereToAdd={whereToAdd || "orders"}
          />
        ))}
      </Flex>

      <Button
        type="primary"
        size="large"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          gap: "15px",
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
        <IconShoppingCart /> {whereToAdd}
      </Button>
    </div>
  );
};
