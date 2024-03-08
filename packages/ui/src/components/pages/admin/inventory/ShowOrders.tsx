import { DateField, Show, useEditableTable } from "@refinedev/antd";
import { useGo, useList } from "@refinedev/core";
import {
  GET_ALL_ORDERS_QUERY,
  GET_ALL_pRODUCTS_QUERY,
  Orders,
} from "@repo/graphql";
import { Button, Space, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { useLocation } from "react-router-dom";

export const ShowOrders = () => {
  const go = useGo();
  const userId = useLocation().pathname.split("/").pop();

  const { tableQueryResult, tableProps } = useEditableTable({
    resource: "ORDERS",
    pagination: {
      pageSize: 12,
    },
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
      initial: [
        {
          field: "user_id",
          operator: "eq",
          value: userId,
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
    <Show canEdit={false} isLoading={isLoadingProducts}>
      {/* <pre>{JSON.stringify(tableQueryResult, null, 2)}</pre> */}
      <Table {...tableProps} bordered>
        <Table.Column<Orders>
          dataIndex={"product_id"}
          title="Product Name"
          render={(_value, record: Orders) => {
            const product = products?.data?.find(
              (item) => item.id === record.product_id,
            );
            return <Space>{product?.name}</Space>;
          }}
        />
        <Table.Column<Orders>
          dataIndex={"quantity"}
          title="quantity"
          render={(_value, record) => <Space>{record.quantity}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"status"}
          title="status"
          render={(_value, record) => <Space>{record.status}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"batch_no"}
          title="batch_no"
          render={(_value, record) => <Space>{record.batch_no || "-"}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"created_at"}
          title="created_at"
          render={(_value, record) => <DateField value={record.created_at} />}
        />
        <Table.Column<Orders>
          title="Actions"
          render={(_value, record) => {
            return (
              <ButtonGroup size="middle">
                <Button
                  type="primary"
                  onClick={() =>
                    go({
                      to: { action: "edit", resource: "orders", id: record.id },
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    console.error("Deleteing order");
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            );
          }}
        />
      </Table>
    </Show>
  );
};
