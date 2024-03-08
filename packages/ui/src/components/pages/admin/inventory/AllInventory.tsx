import {
  DateField,
  DeleteButton,
  EditButton,
  Show,
  useTable,
} from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { GET_ALL_STOCKS_QUERY, GET_ALL_pRODUCTS_QUERY } from "@repo/graphql";
import { Skeleton, Space, Table } from "antd";

export const AllInventory = () => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "STOCKS",
    meta: {
      gqlQuery: GET_ALL_STOCKS_QUERY,
    },
    pagination: {
      pageSize: 12,
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
    <Show>
      <Table {...tableProps} loading={tableQueryResult.isLoading}>
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
                    (item: any) => item.id === record.product_id,
                  )?.name
                }
              </Space>
            );
          }}
        />
        <Table.Column
          dataIndex={"batch_no"}
          title="batchNo"
          render={(value) => {
            return <Space>{value}</Space>;
          }}
        />
        <Table.Column
          dataIndex={"selling_price"}
          title="selling_price"
          render={(value) => {
            return <Space>{value}</Space>;
          }}
        />
        <Table.Column
          dataIndex={"avalable_quantity"}
          title="avalable_quantity"
          render={(value) => {
            return <Space>{value}</Space>;
          }}
        />
        <Table.Column
          dataIndex={"orderd_quantity"}
          title="orderd_quantity"
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
                {/* <DatePicker defaultValue={dayjs(value)} /> */}
                <DateField value={value} />
              </Space>
            );
          }}
        />
        <Table.Column
          dataIndex={"expiry_date"}
          title="Expiry At"
          render={(value) => {
            return (
              <Space>
                {/* <DatePicker defaultValue={dayjs(value)} /> */}
                <DateField value={value} />
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
              <EditButton size="small" recordItemId={value} />
              <DeleteButton size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
    </Show>
  );
};
