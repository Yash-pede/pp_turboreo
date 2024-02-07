import { useGo, useList } from "@refinedev/core";
import {
  GET_ALL_STOCKS_QUERY,
  GET_ALL_pRODUCTS_QUERY,
} from "@repo/graphql";
import { Button, Card, Flex } from "antd";
import { IconShoppingCart } from "@tabler/icons-react";
import { ProductCardPublic } from "@repo/ui";
export const AllAvalableProducts = () => {
  const { data: StockInventory, isLoading } = useList({
    resource: "STOCKS",
    meta: {
      gqlQuery: GET_ALL_STOCKS_QUERY,
    },
  });
  const { data } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "in",
        value: StockInventory?.data?.map((stock: any) => stock.product_id),
      },
    ],
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
          <ProductCardPublic
            product={product}
            isLoading={isLoading}
            key={product.id}
            RenderButton={() => (
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
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  go({
                    to: {
                      resource: "orders",
                      action: "create",
                    },
                    query: {
                      product_id: product.id,
                    },
                    type: "push",
                    options: {
                      keepQuery: true,
                    },
                  });
                }}
              >
                <IconShoppingCart /> Add to Orders
              </Button>
            )}
          />
        ))}
      </Flex>
    </div>
  );
};
