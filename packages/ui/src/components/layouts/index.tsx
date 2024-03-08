import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Header } from "./header";
import React from "react";
// import { CustomSider } from "@repo/ui";
export const Layout = ({
  children,
  appName,
}: {
  children: React.ReactNode;
  appName: string;
}) => {
  return (
    <ThemedLayoutV2
      Header={() => <Header appName={appName} />}
      Title={(titleProps) => (
        <ThemedTitleV2 {...titleProps} text={"PurePride"} />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};
