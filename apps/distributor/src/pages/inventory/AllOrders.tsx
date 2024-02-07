import { EditButton, useTable } from "@refinedev/antd";
import { GET_ALL_ORDERS_QUERY, GET_ALL_pRODUCTS_QUERY } from "@repo/graphql";
import { Skeleton, Space, Table } from "antd";
import { authProvider } from "../auth/authProvider";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

export const AllOrders = ({ children }: { children?: React.ReactNode }) => {
  const [userId, setUser] = React.useState<any>();

  useEffect(() => {
    const fetchUserIdentity = async () => {
      if (authProvider.getIdentity) {
        const user: any = await authProvider.getIdentity();
        setUser(user?.id);
      }
    };

    if (!userId) {
      fetchUserIdentity();
    }
  }, [userId]);
  const { tableProps, tableQueryResult } = useTable({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "asc",
        },
      ],
    },
    filters: {
      permanent: [
        {
          field: "user_id",
          operator: "eq",
          value: userId || "",
        },
      ],
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.product_id),
      },
    ],
  });
  return (
    <>
      <Table loading={tableQueryResult.isLoading} {...tableProps}>
        <Table.Column
          dataIndex="id"
          title="ID"
          render={(value) => <strong>{value}</strong>}
        />
        <Table.Column
          dataIndex={"product_id"}
          title="product"
          render={(_value, record: any) => {
            if (isLoadingProducts) {
              return <Skeleton.Input />;
            }
            return (
              <Space>
                {
                  products?.data.find(
                    (item: any) => item.id === record.product_id
                  )?.name
                }
              </Space>
            );
          }}
        />
        <Table.Column
          dataIndex="batch_no"
          title="Batch No"
          render={(value: Array<any>) => (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {value.map((item) => (
                <p>{item}</p>
              ))}
            </div>
          )}
        />
        <Table.Column dataIndex="quantity" title="Quantity" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex="salesperson_id"
          title="Sales Person"
          render={(value) => value || "-"}
        />
        <Table.Column
          dataIndex="created_at"
          title="Date"
          render={(value) => (
            <strong>{dayjs(value).format("DD/MM/YYYY")}</strong>
          )}
        />
        <Table.Column
          dataIndex={"id"}
          title="Action"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton size="small"  recordItemId={value} />
              {/* <DeleteButton size="small"  recordItemId={value} /> */}
            </Space>
          )}
        />
      </Table>
      {children}
    </>
  );
};
