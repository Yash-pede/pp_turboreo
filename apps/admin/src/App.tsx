import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { UserRoleTypes, authProvider, supabaseClient } from "@repo/utility";
import { ForgotPassord, Home, Register, Users } from "./pages";
import {
  AllProducts,
  Layout,
  Profile,
  ProductPage,
  AllOrders,
  EditOrders,
  AllInventory,
  LoginNew,
  CreateStock,
} from "@repo/ui";
import { resources } from "./config/resources";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <ConfigProvider theme={RefineThemes.Blue}>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "iFYvWr-enuJkT-PNWBX2",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/login"
                    element={<LoginNew userType={UserRoleTypes.ADMIN} />}
                  />
                  <Route path="/forgot-password" element={<ForgotPassord />} />

                  <Route
                    element={
                      <Authenticated
                        key={"authenticated-layout"}
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout appName="Admin">
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    login
                    <Route index element={<Home />} />
                    <Route path="/products">
                      <Route index element={<AllProducts />} />
                      <Route path=":id" element={<ProductPage />} />
                      <Route path="create" element={<>U r not su admin</>} />
                    </Route>
                    <Route path="/orders">
                      <Route index element={<AllOrders />} />
                      <Route path="edit/:id" element={<EditOrders />} />
                    </Route>
                    <Route path="/inventory">
                      <Route index element={<AllInventory />} />
                      <Route path="create" element={<CreateStock />} />
                    </Route>
                    <Route path="/profiles" element={<Users />} />
                    <Route path="/me" element={<Profile />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </ConfigProvider>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
