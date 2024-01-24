import { useList } from "@refinedev/core";
import React from "react";
import { ALL_PRODUCTS_QUERY } from "@repo/graphql";
import { ProductCard } from "./ProductCard";
import { Flex, Space, Typography } from "antd";

export const AllProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
  });
  const { Text } = Typography;
  return (
    <Flex wrap="wrap" gap="small">
      {data?.data.map((product: any) => (
        <>
        <ProductCard product={product} isLoading={isLoading} key={product.id} />
        <ProductCard product={product} isLoading={isLoading} key={product.id} />
        <ProductCard product={product} isLoading={isLoading} key={product.id} />
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
