import { Create, useDrawerForm } from "@refinedev/antd";
import { Drawer } from "antd";
import { Users } from "./Users";

export const CreateUsers = () => {
  const { saveButtonProps, drawerProps } = useDrawerForm({
    action: "create",
  });
  return (
    <Users>
    <Drawer {...drawerProps}>
      <Create saveButtonProps={saveButtonProps}>CreateUsers</Create>
    </Drawer>
    </Users>
  );
};
