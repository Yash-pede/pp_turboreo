import { useList } from "@refinedev/core";
import React from "react";
import { ALL_PRODUCTS_QUERY } from "@repo/graphql";
import { ProductCard } from "./ProductCard";
import { Card, Flex, Typography } from "antd";

export const AllProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
  });
  const { Text } = Typography;
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        {Array<Number>(7)
          .fill(0)
          .map((_: any, index: React.Key | null | undefined) => (
            <Card
              key={index}
              loading
              style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
            />
            ))}
      </div>
    );
  }
  
  

  return (
    <Flex wrap="wrap" gap="small">
      {data?.data.map((product: any) => (
        <>
          <ProductCard
            product={product}
            isLoading={isLoading}
            key={product.id}
          />
        </>
      ))}
      <Text>
        {/* <pre >
        {JSON.stringify(data, null, 2)}
      </pre> */}
      </Text>
    </Flex>
  );
};
