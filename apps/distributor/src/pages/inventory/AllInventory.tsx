import { useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import {
  ALL_INVENTORY_DISTRIBUTOR_QUERY,
  ALL_PRODUCTS_QUERY,
} from "@repo/graphql";
import { DatePicker, Skeleton, Space, Table } from "antd";
import dayjs from "dayjs";

export const AllInventory = () => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "inventory_distributor",
    meta: {
      gqlQuery: ALL_INVENTORY_DISTRIBUTOR_QUERY,
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "asc",
        },
      ],
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
    <Table {...tableProps} loading={tableQueryResult.isLoading}>
      <Table.Column
        dataIndex={"productId"}
        title="product"
        render={(_value, record:any) => {
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
      <Table.Column
        dataIndex={"quantity"}
        title="Quantity"
        render={(value) => {
          return <Space>{value}</Space>;
        }}
      />
      <Table.Column
        dataIndex={"created_at"}
        title="Created At"
        render={(value) => {
          return (
            <Space>
              <DatePicker defaultValue={dayjs(value)} disabled />
            </Space>
          );
        }}
      />
    </Table>
  );
};
