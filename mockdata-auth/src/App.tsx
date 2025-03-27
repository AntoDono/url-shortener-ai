import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { ErrorComponent, ThemedLayoutV2, AuthPage, RefineThemes } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, { NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { authProvider } from "./providers/auth";
import { createDataProvider } from "./providers/data";
import { LinkList } from "./pages/links/list";
import { LinkCreate } from "./pages/links/create";
import { LinkEdit } from "./pages/links/edit";
import { LinkShow } from "./pages/links/show";

export const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <RefineKbarProvider>
          <Refine
            dataProvider={createDataProvider()}
            authProvider={authProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "links",
                list: "/links",
                create: "/links/create",
                edit: "/links/edit/:id",
                show: "/links/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}>
            <Routes>
              {/* Auth Routes */}
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="links" />
                  </Authenticated>
                }>
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/register" element={<AuthPage type="register" />} />
              </Route>

              {/* Protected Routes */}
              <Route
                element={
                  <Authenticated key="protected-routes">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }>
                {/* Home Page */}
                <Route index element={<NavigateToResource resource="links" />} />

                {/* Links */}
                <Route path="/links">
                  <Route index element={<LinkList />} />
                  <Route path="create" element={<LinkCreate />} />
                  <Route path="edit/:id" element={<LinkEdit />} />
                  <Route path="show/:id" element={<LinkShow />} />
                </Route>

                {/* Resource routes will be generated here by the resource-orchestrator-agent */}

                {/* Error Page */}
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};
