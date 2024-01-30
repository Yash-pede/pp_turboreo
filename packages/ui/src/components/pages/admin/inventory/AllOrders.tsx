import React from "react";
import { DeleteButton, EditButton, useTable } from "@refinedev/antd";
import { ALL_ORDERS_QUERY, ALL_PRODUCTS_QUERY, Orders } from "@repo/graphql";
import { Skeleton, Space, Table } from "antd";
import { useList } from "@refinedev/core";

export const AllOrders = ({ children }: { children?: React.ReactNode }) => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "orders",
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: ALL_ORDERS_QUERY,
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.productId),
      },
    ],
  });
  return (
    <div>
      {/* <pre>{JSON.stringify(tableQueryResult, null, 2)}</pre> */}
      <Table
        {...tableProps}
        loading={tableQueryResult.isLoading}
        pagination={{ ...tableProps.pagination }}
      >
        <Table.Column<Orders>
          dataIndex={"productId"}
          title="product"
          render={(_value, record) => {
            if (isLoadingProducts) {
              return <Skeleton.Input />;
            }
            return (
              <Space>
                {
                  products?.data.find((item) => item.id === record.productId)
                    ?.name
                }
              </Space>
            );
          }}
        />
        <Table.Column<Orders>
          dataIndex={"userId"}
          title="userId"
          render={(_value, record) => <Space>{record.userId}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"quantity"}
          title="quantity"
          render={(_value, record) => <Space>{record.quantity || "-"}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"status"}
          title="status"
          render={(_value, record) => {
            return <Space>{record.status}</Space>;
          }}
        />

        <Table.Column<Orders>
          dataIndex={"id"}
          title="Action"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton size="small" recordItemId={value} />
              <DeleteButton size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
      {children}
    </div>
  );
};
