import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Header } from "./header";
import React, { useState } from "react";
import { CustomSider } from "./Sidebar";
export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Sider={CustomSider}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text={"Refine"} />}
    >
      {children}
    </ThemedLayoutV2>
  );
};
