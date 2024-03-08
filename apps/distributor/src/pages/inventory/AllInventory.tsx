import { useTable } from "@refinedev/antd";
import {
  GET_ALL_INVENTORY_DISTRIBUTOR_QUERY,
  GET_ALL_pRODUCTS_QUERY,
} from "@repo/graphql";
import { Skeleton, Space, Table } from "antd";
import { authProvider } from "../auth/authProvider";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useList } from "@refinedev/core";

export const AllInventory = () => {
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
    resource: "D_INVENTORY",
    meta: {
      gqlQuery: GET_ALL_INVENTORY_DISTRIBUTOR_QUERY,
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
          field: "distributor_id",
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
                    (item: any) => item.id === record.product_id,
                  )?.name
                }
              </Space>
            );
          }}
        />
        <Table.Column dataIndex="batch_no" title="Batch No" />
        <Table.Column dataIndex="quantity" title="Quantity" />
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
      </Table>
    </>
  );
};
