import React from "react";
import { PROFILES_QUERY, Profiles } from "@repo/graphql";
import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  useTable,
} from "@refinedev/antd";
import { Input, Space, Table } from "antd";
import { getDefaultFilter } from "@refinedev/core";
import { SearchOutlined } from "@ant-design/icons";

export const Users = () => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "profiles",
    onSearch(values: any) {
      return [
        {
          field: "username",
          operator: "contains",
          value: values.username,
        },
      ];
    },
    pagination: {
      pageSize: 4,
    },
    meta: {
      gqlQuery: PROFILES_QUERY,
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
          field: "username",
          operator: "contains",
          value: null,
        },
      ],
    },
  });
  return (
    <div>
      <Table
        {...tableProps}
        loading={tableQueryResult.isLoading}
        pagination={{ ...tableProps.pagination }}
      >
        <Table.Column<Profiles>
          dataIndex={"username"}
          title="Username"
          defaultFilteredValue={getDefaultFilter(
            "username",
            tableQueryResult?.data?.filters
          )}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              filters={tableQueryResult?.data?.filters}
            >
              <Input placeholder="Search username" />
            </FilterDropdown>
          )}
          render={(_value, record) => <Space>{record.username || "-"}</Space>}
        />
        <Table.Column<Profiles>
          dataIndex={"email"}
          title="email"
          defaultFilteredValue={getDefaultFilter(
            "email",
            tableQueryResult?.data?.filters
          )}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              filters={tableQueryResult?.data?.filters}
            >
              <Input placeholder="Search email" />
            </FilterDropdown>
          )}
          render={(_value, record) => <Space>{record.email}</Space>}
        />

        <Table.Column<Profiles>
          dataIndex={"id"}
          title="Action"
          fixed="right"
          render={(value) => (
            <Space>
              <EditButton size="small" hideText recordItemId={value} />
              <DeleteButton size="small" hideText recordItemId={value} />
            </Space>
          )}
        />
      </Table>
      {/* <pre>{JSON.stringify(tableQueryResult?.data, null, 2)}</pre> */}
    </div>
  );
};
