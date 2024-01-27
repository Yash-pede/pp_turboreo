import { DeleteButton, EditButton, useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY, ALL_PRODUCT_BATCHES_QUERY } from "@repo/graphql";
import { DatePicker, Skeleton, Space, Table } from "antd";
import dayjs from "dayjs";

export const AllInventory = () => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "product_batches",
    meta: {
      gqlQuery: ALL_PRODUCT_BATCHES_QUERY,
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
        render={(_value, record: any) => {
          if (isLoadingProducts) {
            return <Skeleton.Input />;
          }
          return (
            <Space>
              {
                products?.data.find((item: any) => item.id === record.productId)
                  ?.name
              }
            </Space>
          );
        }}
      />
      <Table.Column
        dataIndex={"batchNo"}
        title="batchNo"
        render={(value) => {
          return <Space>{value}</Space>;
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
              <DatePicker defaultValue={dayjs(value)} />
            </Space>
          );
        }}
      />
        <Table.Column
          dataIndex={"id"}
          title="Action"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton size="small"  recordItemId={value} />
              <DeleteButton size="small"  recordItemId={value} />
            </Space>
          )}
        />
    </Table>
  );
};
