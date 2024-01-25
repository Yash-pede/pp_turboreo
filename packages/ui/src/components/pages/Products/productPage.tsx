import { useLocation } from "react-router-dom";
import { useGo, useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY } from "@repo/graphql";
import { Button, Typography } from "antd";
import { DateField, DeleteButton } from "@refinedev/antd";

export const ProductPage = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const go = useGo();
  const { Title, Paragraph, Text } = Typography;
  const { data: Product } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "eq",
        value: id,
      },
    ],
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "auto",
          width: "70%",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div style={{ marginBottom: "16px" }}>
            <Title level={1}>{Product?.data[0]?.name}</Title>
            <Paragraph>{Product?.data[0]?.description}</Paragraph>
            <Text>
              Updated at:{" "}
              <DateField value={Product?.data[0]?.updatedAt}></DateField>
            </Text>
          </div>
          <div style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent:"center",
            width:"50%",
          }}>
            <Button type="primary" style={{width:"50%"}} size="large">
              Edit
            </Button>
            <DeleteButton style={{width:"50%"}}
              onSuccess={() => {
                go({
                  to: "/products",
                  type: "push",
                });
              }}
            />
          </div>
        </div>
        <div>
          <img
            src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${Product?.data[0]?.imageURL}`}
            alt=""
            style={{ width: "100%", height: "300px", objectFit: "cover",borderRadius:"3%",overflow:"hidden" }}
          />
        </div>
      </div>
      <div style={{ marginTop: "16px" }}></div>
      {/* <pre>{JSON.stringify(Product?.data[0], null, 2)}</pre> */}
    </>
  );
};