import React, { useEffect } from "react";
import { EditButton, ExportButton, List, useTable } from "@refinedev/antd";
import {
  GET_ALL_ORDERS_QUERY,
  GET_ALL_pRODUCTS_QUERY,
  Orders,
} from "@repo/graphql";
import { Checkbox, Skeleton, Space, Table } from "antd";
import { useExport, useGo, useList } from "@refinedev/core";
import { authProvider } from "@repo/utility";
import dayjs from "dayjs";

export const AllOrders = ({ children }: { children?: React.ReactNode }) => {
  const go = useGo();
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
  const { triggerExport, isLoading: exportLoading } = useExport({
    download: true,
    resource: "ORDERS",
    meta: {
      fields: ["product_id", "quantity", "status", "created_at"],
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    filters: [
      {
        field: "user_id",
        operator: "eq",
        value: userId || "",
      },
      {
        field: "product_id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.product_id),
      },
    ],
    sorters: [
      {
        field: "created_at",
        order: "asc",
      },
    ],
    mapData: (record) => {
      return {
        productName: products?.data.find(
          (item: any) => item.id === record.product_id,
        )?.name,
        quantity: record.quantity,
        status: record.status,
        created_at: dayjs(record.created_at).format("DD-MM-YYYY"),
        id: record.id,
      };
    },
    exportOptions: {
      filename: "orders",
    },
  });

  return (
    <List
      canCreate={false}
      headerButtons={
        <ExportButton onClick={triggerExport} loading={exportLoading} />
      }
    >
      {/* <pre>{JSON.stringify(tableQueryResult, null, 2)}</pre> */}
      <Table
        {...tableProps}
        loading={tableQueryResult.isLoading}
        pagination={{ ...tableProps.pagination }}
      >
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

        <Table.Column<Orders>
          dataIndex={"quantity"}
          title="quantity"
          render={(_value, record) => <Space>{record.quantity || "-"}</Space>}
        />
        <Table.Column<Orders>
          dataIndex={"status"}
          title="status"
          render={(_value, record) => {
            return record.status === "Fulfilled" ? (
              <Checkbox defaultChecked checked>
                {record.status}
              </Checkbox>
            ) : (
              <Checkbox>{record.status}</Checkbox>
            );
          }}
        />
        <Table.Column
          dataIndex="created_at"
          title="Date"
          render={(value) => (
            <strong>{dayjs(value).format("DD/MM/YYYY")}</strong>
          )}
        />
        <Table.Column
          dataIndex="salesperson_id"
          title="Sales Person"
          render={(value) => value || "-"}
        />
        <Table.Column<Orders>
          dataIndex={"id"}
          title="Action"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton
                size="small"
                recordItemId={value}
                onClick={() =>
                  go({
                    to: {
                      resource: "orders",
                      action: "edit",
                      id: value,
                    },
                    options: { keepQuery: true },
                    type: "replace",
                    query: {
                      productId: tableQueryResult?.data?.data?.[0]?.productId,
                    },
                  })
                }
              />
              {/* <DeleteButton size="small" recordItemId={value} /> */}
            </Space>
          )}
        />
      </Table>
      {children}
    </List>
  );
};
