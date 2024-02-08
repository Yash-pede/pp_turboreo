import { useModalForm } from "@refinedev/antd";
import { CREATE_ORDER_MUTATION } from "@repo/graphql";
import { Alert, Button, Form, Input, InputNumber, Modal, Skeleton } from "antd";
import { useLocation } from "react-router-dom";
import { authProvider } from "../auth/authProvider";
import { useEffect, useState } from "react";
import { useGo } from "@refinedev/core";

export const CreateOrders = () => {
  const go = useGo();
  const GoToOrdersPage = () => {
    go({
      to: { resource: "orders", action: "list" },
      type: "push",
      options: { keepQuery: true },
    });
  };
  const { modalProps, formProps } = useModalForm({
    action: "create",
    resource: "ORDERS",
    redirect: "show",
    defaultVisible: true,
    meta: {
      gqlMutation: CREATE_ORDER_MUTATION,
    },
    onMutationSuccess() {
      GoToOrdersPage();
    },
  });
  const [userId, setUser] = useState<string>();
  const [quantity, setQuantity] = useState(5);

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
    formProps.form?.setFieldValue("user_id", userId);
  }, [userId]);

  formProps.initialValues = {
    quantity: 5,
    user_id: userId,
    product_id: useLocation().search.split("=")[1],
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(5, prevQuantity + change));
    formProps.form?.setFieldsValue({ quantity: quantity + change });
  };

  return (
    <Modal
      {...modalProps}
      onOk={() => {
        const totalQuantity = quantity + Math.floor(quantity / 5);
        formProps.form?.setFieldsValue({ quantity: totalQuantity });
        formProps.form?.submit();
      }}
      onCancel={GoToOrdersPage}
    >
      <Form {...formProps} size={"large"} layout="vertical">
        <Form.Item name="user_id" label="User Id" rules={[{ required: true }]}>
          {userId ? <Input readOnly /> : <Skeleton.Input />}
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
          rules={[{ required: true, type: "number", min: 5 }]}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              gap: "15px",
            }}
          >
            <Button
              type="primary"
              onClick={() => handleQuantityChange(-5)}
              disabled={quantity <= 5}
            >
              -
            </Button>
            <InputNumber value={quantity} defaultValue={quantity} readOnly />
            <Button type="primary" onClick={() => handleQuantityChange(5)}>
              +
            </Button>
            <Alert
              style={{ marginLeft: "10px", marginTop: "5px" }}
              type="warning"
              message={`Total Quantity: ${quantity + Math.floor(quantity / 5)}`}
            />
          </div>
        </Form.Item>
        <Alert
          message="Quantity Scheme: 5 + 1"
          description="For every 5 products ordered, the actual quantity will be increased by 1."
          showIcon
          type="info"
        />
      </Form>
    </Modal>
  );
};
