import { useModalForm } from "@refinedev/antd";
import { CREATE_ORDER_MUTATION } from "@repo/graphql";
import { Form, Input, InputNumber, Modal } from "antd";
import { useLocation } from "react-router-dom";
import { authProvider } from "../auth/authProvider";
import React, { useEffect } from "react";

export const CreateOrders = () => {
  const { modalProps, formProps } = useModalForm({
    action: "create",
    resource: "ORDERS",
    redirect: "show",
    defaultVisible: true,
    meta: {
      gqlMutation: CREATE_ORDER_MUTATION,
    },
  });
  const [userId, setUser] = React.useState<string>();

  useEffect(() => {
    const fetchUserIdentity = async () => {
      if (authProvider.getIdentity) {
        const user: any = await authProvider.getIdentity();
        setUser(user?.id);
      }
    };

    if (!userId) {
      fetchUserIdentity();
    }
  }, [userId]);

  formProps.initialValues = {
    quantity: 0,
    user_id: userId,
    product_id: useLocation().search.split("=")[1],
  };

  return (
    <Modal {...modalProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item name="user_id" label="User Id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="product_id"
          label="Product Id"
          rules={[{ required: true }]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};
