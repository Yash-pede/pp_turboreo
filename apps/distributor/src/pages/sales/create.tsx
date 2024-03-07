import { Create } from "@refinedev/antd";
import { Drawer, Form, Input, Space } from "antd";
import { supabaseServiceRoleClient } from "@repo/utility";
import { useGo, useNotification } from "@refinedev/core";
import { SalesHome } from ".";

export const SalesCreate = () => {
  const { open, close } = useNotification();
  const [form] = Form.useForm();
  const go = useGo();

  const CreateSalesUser = async (
    email: string,
    name: string,
    phNo: string,
    password: string,
    boss_id: string
  ) => {
    open &&
      open({
        key: "create-sales-user",
        type: "progress",
        message: "Creating User...",
        description: "Please wait while we create your Sales user.",
        undoableTimeout: 2000,
      });
    const { data, error } =
      await supabaseServiceRoleClient.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          username: name,
          phone: phNo,
          boss_id: boss_id,
        },
      });
    console.log(data, error);
    if (data.user) {
      close && close("create-sales-user");
      open &&
        open({
          key: "create-sales-user",
          type: "success",
          message: "Sales User Created",
          description: "Sales User Created Successfully",
        });
      go({
        to: { action: "list", resource: "sales" },
        type: "push",
      });
    } else {
      close && close("create-sales-user");
      open &&
        open({
          key: "create-sales-user-error",
          type: "error",
          message: "Try entering different credentials",
          description: "Sales User Creation Failed",
        });
      console.log(error);
    }
  };
  form.submit = async () => {
    const values = form.getFieldsValue();
    const userId = JSON.parse(localStorage.getItem("USER") || "{}")
      .id as string;
    console.log(userId);
    CreateSalesUser(
      values.email,
      values.name,
      values.phone,
      values.password,
      userId
    );
  };
  return (
    <SalesHome>
      <Drawer
        onClose={() => {
          go({
            to: { action: "list", resource: "sales" },
            type: "push",
          });
        }}
        open
      >
        <Create
          title="Create Sales User"
          saveButtonProps={{ onClick: () => form.submit(), htmlType: "submit" }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true, message: "Invalid Email", type: "email" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              label="Name"
              name={"name"}
              rules={[
                { required: true, message: "Name is required", type: "string" },
              ]}
            >
              <Input placeholder="Name" type="text" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name={"phone"}
              rules={[
                {
                  required: true,
                  message: "Invalid Phone Number",
                  len: 10,
                  transform(value: any) {
                    return value.trim().replace(/\s/g, "");
                  },
                },
              ]}
            >
              <Space.Compact>
                <Input
                  style={{ width: "20%" }}
                  defaultValue="+91"
                  contentEditable={false}
                />
                <Input style={{ width: "80%" }} placeholder="123456789" />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  max: 8,
                  min: 4,
                  type: "string",
                  message: "Password is required",
                  validator(rule, value) {
                    if (value.trim().length < 4 || value.trim().length > 8) {
                      rule.message =
                        "Password length should be between 4 and 8 Characters";
                    }
                  },
                  transform(value: any) {
                    return value.trim().replace(/\s/g, "");
                  },
                },
              ]}
            >
              <Input.Password placeholder="Password" type="password" />
            </Form.Item>
            {/* <Button
              onClick={() => form.submit()}
              type="primary"
              htmlType="submit"
            >
              Create User
            </Button> */}
          </Form>
        </Create>
      </Drawer>
    </SalesHome>
  );
};
