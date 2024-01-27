import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
    },
  },
  {
    name: "products",
    list: "/products",
    meta: {
      label: "Products",
    },
    show: "/products/:id",
    create: "/products/create",
  },
  {
    name: "orders",
    list: "/orders",
    meta: {
      label: "Orders",
    },
    show: "/orders/:id",
    edit: "/orders/edit/:id",
    create: "/orders/create",
  },
  {
    name: "inventory",
    list: "/inventory",
    meta: {
      label: "Inventory",
    },
    show: "/inventory/:id",
  },
  {
    name: "reports",
    list: "/reports",
    meta: {
      label: "Reports",
    },
    show: "/reports/:id",
    edit: "/reports/edit/:id",
    create: "/reports/create",
  },
  {
    name: "profiles",
    list: "/profiles",
    meta: {
      label: "profiles",
    },
    show: "/profiles/:id",
    edit: "/profiles/edit/:id",
    create: "/profiles/create",
  },
];
