import React from "react";
import { EditButton, FilterDropdown, useTable } from "@refinedev/antd";
import { ALL_ORDERS_QUERY, ALL_PRODUCTS_QUERY, Orders } from "@repo/graphql";
import { Input, Skeleton, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";

export const AllCart = ({ children }: { children?: React.ReactNode }) => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "orders",
    pagination: {
      pageSize: 4,
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
          dataIndex={"quantity"}
          title="quantity"
          render={(_value, record) => <Space>{record.quantity || "-"}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"status"}
          title="status"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              filters={tableQueryResult?.data?.filters}
            >
              <Input placeholder="Search status" />
            </FilterDropdown>
          )}
          render={(_value, record) => <Space>{record.status}</Space>}
        />

        <Table.Column<Orders>
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
    </div>
  );
};
