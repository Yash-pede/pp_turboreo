import React from "react";
import { useList } from "@refinedev/core";
import { PROFILES_QUERY } from "@repo/graphql";
import { Flex, Skeleton } from "antd";

export const Home = () => {
  const { data, isLoading } = useList({
    resource: "profiles",
    pagination: {
      pageSize: 3,
    },
    sorters: [
      {
        field: "username",
        order: "asc",
      }
    ],
    meta: {
      gqlQuery: PROFILES_QUERY,
    },
    filters: [
      {
        field: "username",
        operator: "eq",
        value: "yashpede",
      }
    ]
  });
  return (
    <div><div className="w-3 h-3 bg-black">Products page</div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Flex>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Flex>
    </div>
  );
};
