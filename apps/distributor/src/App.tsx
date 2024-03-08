import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  RefineThemes,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
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
import {
  AllAvalableProducts,
  AllInventory,
  AllOrders,
  CreateOrders,
  CustomerCreate,
  CustomerEdit,
  CustomerHome,
  CustomerShow,
  EditOrders,
  ForgotPassord,
  Home,
  Register,
  SalesCreate,
  SalesEdit,
  SalesHome,
  SalesShow,
} from "./pages";
import { Profile, ProductPage, LoginNew, Header } from "@repo/ui";
import { resources } from "./config/resources";
import { ShoppingCartProvider } from "./contexts/cart/ShoppingCartContext";
// import { Layout } from "./components/layouts";
import { ThemedTitleV2 } from "@refinedev/antd";

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
                <ShoppingCartProvider>
                  <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/login"
                      element={
                        <LoginNew userType={UserRoleTypes.DISTRIBUTORS} />
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassord />}
                    />
                    <Route
                      element={
                        <Authenticated
                          key={"authenticated-layout"}
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          {/* <Layout appName="Distributor"> */}
                          <ThemedLayoutV2
                            Header={() => <Header appName="Distributor" />}
                            Title={(titleProps) => (
                              <ThemedTitleV2
                                {...titleProps}
                                text={"PurePride"}
                              />
                            )}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                          {/* </Layout> */}
                        </Authenticated>
                      }
                    >
                      login
                      <Route index element={<Home />} />
                      <Route path="/products">
                        <Route index element={<AllAvalableProducts />} />
                        <Route
                          path=":id"
                          element={<ProductPage admin={false} />}
                        />
                      </Route>
                      <Route path="/orders">
                        <Route index element={<AllOrders />} />
                        <Route path="create" element={<CreateOrders />} />
                        <Route path="edit/:id" element={<EditOrders />} />
                      </Route>
                      <Route path="/customer">
                        <Route index element={<CustomerHome />} />
                        <Route path="edit/:id" element={<CustomerEdit />} />
                        <Route path="create" element={<CustomerCreate />} />
                        <Route path=":id" element={<CustomerShow />} />
                      </Route>
                      <Route path="/sales">
                        <Route index element={<SalesHome />} />
                        <Route path="edit/:id" element={<SalesEdit />} />
                        <Route path="create" element={<SalesCreate />} />
                        <Route path=":id" element={<SalesShow />} />
                      </Route>
                      <Route path="/inventory" element={<AllInventory />} />
                      <Route path="/me" element={<Profile />} />
                    </Route>
                  </Routes>
                </ShoppingCartProvider>
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
