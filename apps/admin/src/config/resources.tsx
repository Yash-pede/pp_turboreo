import { IResourceItem } from "@refinedev/core";
import { IconDashboard, IconPackage, IconPackageExport, IconPackageImport, IconUser } from "@tabler/icons-react";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <IconDashboard />,
    },
  },
  {
    name: "products",
    list: "/products",
    meta: {
      label: "Products",
      icon: <IconPackage />,
    },
    show: "/products/:id",
    create: "/products/create",
  },
  {
    name: "orders",
    list: "/orders",
    meta: {
      label: "Orders",
      icon: <IconPackageExport />,
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
      icon: <IconPackageImport />,
    },
    show: "/inventory/:id",
  },
  {
    name: "profiles",
    list: "/profiles",
    meta: {
      label: "profiles",
    },  icon: <IconUser />,
    show: "/profiles/:id",
    edit: "/profiles/edit/:id",
    create: "/profiles/create",
  },
];
