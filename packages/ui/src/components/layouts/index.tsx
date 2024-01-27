import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Header } from "./header";
import React from "react";
import { CustomSider } from "./Sidebar";
export const Layout = ({
  children,
  appName,
}: {
  children: React.ReactNode;
  appName: string;
}) => {
  console.log(appName);
  return (
    <ThemedLayoutV2
      Header={() => <Header appName={appName || "PurePride"} />}
      Sider={CustomSider}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text={"PurePride"} />}
    >
      {children}
    </ThemedLayoutV2>
  );
};
