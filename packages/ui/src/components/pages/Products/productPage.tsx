import { useLocation } from "react-router-dom";
import { useGo, useList } from "@refinedev/core";
import { GET_ALL_pRODUCTS_QUERY } from "@repo/graphql";
import { Button, Descriptions, Image, Row } from "antd";
import { DateField, DeleteButton, Show } from "@refinedev/antd";

export const ProductPage = ({ admin }: { admin: boolean }) => {
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const go = useGo();
  const { data: Product } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
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
      <Show>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "auto",
            width: "70%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Row justify="center" align="middle" style={{ gap: "16px" }}>
            <Descriptions bordered size="default" column={2}>
              <Descriptions.Item label="Name">
                {Product?.data[0]?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {Product?.data[0]?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {Product?.data[0]?.mrp}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                <DateField value={Product?.data[0]?.updatedAt}></DateField>
              </Descriptions.Item>
            </Descriptions>
            {admin && (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Button type="primary" style={{ width: "50%" }} size="large">
                  Edit
                </Button>

                <DeleteButton
                  style={{ width: "50%" }}
                  onSuccess={() => {
                    go({
                      to: "/products",
                      type: "push",
                    });
                  }}
                />
              </div>
            )}
          </Row>
          <div>
            <Image
              src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${Product?.data[0].imageURL}`}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "3%",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </Show>
      {/* <pre>{JSON.stringify(Product, null, 2)}</pre> */}
    </>
  );
};
