import { useGetIdentity } from "@refinedev/core";
import React from "react";

export const Profile = () => {
  const { data: user } = useGetIdentity<any>();
  return <div>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>;
};
