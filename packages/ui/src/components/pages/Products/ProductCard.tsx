import React from "react";
import { Products } from "@repo/graphql";
import { Button, Card, Typography } from "antd";
import dayjs from "dayjs";
import { useGo } from "@refinedev/core";
// import "./card.scss";

export const ProductCard = ({
  product,
  isLoading,
}: {
  product: Products;
  isLoading: boolean;
}) => {
  const { Text, Paragraph, Title } = Typography;
  const go = useGo();
  return (
    <Card
      title={product.name}
      loading={isLoading}
      style={{ width: 300, cursor: "pointer" }}
      onClick={() => go({ to: `/products/${product.id}`, type: "push" })}
    >
      <img
        src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${product.imageURL}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <Paragraph
        style={{
          marginTop: "10px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {product.description}
      </Paragraph>
      <Title level={5}> &#x20b9; {product.price}</Title>
      <Text
        type="secondary"
        style={{ marginTop: "10px", textAlign: "right", width: "100%" }}
      >
        {dayjs(product.updated_at).format("hh:mm A DD MMM YYYY")}
      </Text>
      <Button type="primary" size="large">Edit</Button>
    </Card>
  );
};