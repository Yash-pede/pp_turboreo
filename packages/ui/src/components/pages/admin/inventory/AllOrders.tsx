import React from "react";
import { Show, useTable } from "@refinedev/antd";
import { GET_ALL_PROFILES_QUERY, Profiles } from "@repo/graphql";
import { Space, Table } from "antd";
import { useGo } from "@refinedev/core";
import { UserRoleTypes } from "@repo/utility";

export const AllOrders = ({ children }: { children?: React.ReactNode }) => {
  const go = useGo();

  const { tableProps: profileTableProps } = useTable({
    resource: "profiles",
    meta: {
      gqlQuery: GET_ALL_PROFILES_QUERY,
    },
    sorters: {
      initial: [
        {
          field: "username",
          order: "asc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "userrole",
          operator: "eq",
          value: UserRoleTypes.DISTRIBUTORS,
        },
      ],
    },
  });
  return (
    <Show canEdit={false}>
      {/* <pre>{JSON.stringify(profiles, null, 2)}</pre> */}
      <Table
        {...profileTableProps}
        size="large"
        style={{ cursor: "pointer" }}
        onRow={(record) => ({
          onClick: () => {
            go({
              to: { action: "show", resource: "orders", id: record.id || "" },
              options: { keepQuery: false },
              type: "replace",
            });
          },
        })}
      >
        <Table.Column
          dataIndex={"username"}
          title="username"
          render={(_value, record: Profiles) => (
            <Space>{record.username}</Space>
          )}
        />
        <Table.Column
          dataIndex={"email"}
          title="email"
          render={(_value, record: Profiles) => <Space>{record.email}</Space>}
        />
        <Table.Column
          dataIndex={"userrole"}
          title="User Role"
          render={(_value, record: Profiles) => (
            <Space>{record.userrole}</Space>
          )}
        />
      </Table>
      {children}
    </Show>
  );
};
