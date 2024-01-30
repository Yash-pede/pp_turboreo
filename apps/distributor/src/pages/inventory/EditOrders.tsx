import { Form, Input, Modal, Select, Skeleton } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo, useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY, UPDATE_ORDER_MUTATION } from "@repo/graphql";
import { OrderStatus, authProvider } from "@repo/utility";
import { AllCart } from "./AllCart";
import React, { useEffect } from "react";

export const EditOrders = () => {
  const [userId, setUserId] = React.useState<string>();
  const [form] = Form.useForm();
  const go = useGo();
  const goToList = () => {
    go({
      to: { resource: "orders", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };
  const { modalProps, formProps, queryResult, formLoading } = useModalForm({
    action: "edit",
    defaultVisible: true,
    resource: "orders",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToList,
    meta: {
      gqlMutation: UPDATE_ORDER_MUTATION,
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "eq",
        value: queryResult?.data?.data.productId,
      },
    ],
  });
  useEffect(() => {
    form.setFieldsValue({
      quantity: queryResult?.data?.data.quantity,
      id: queryResult?.data?.data.id,
    });
    const fetchingUser = async () => {
      if (authProvider.getIdentity) {
        const user: any = await authProvider.getIdentity();
        setUserId(user.id);
      }
    };
    fetchingUser();
    form.setFieldsValue({
      userId: userId,
    });
  });
  return (
    <AllCart>
      <Modal
        confirmLoading={formLoading || queryResult?.isLoading}
        {...modalProps}
        mask={true}
        maskClosable
        okButtonProps={{ htmlType: "submit", onClick: () => form.submit() }}
        onCancel={goToList}
        title="Edit Order"
      >
        <Form {...formProps} layout="vertical" form={form}>
          <Form.Item name="id" label="OrderID">
            <Input readOnly />
          </Form.Item>
          <div style={{ width: "100%", gap: "10px", margin: "20px 0" }}>
            <p>Product Name</p>
            {isLoadingProducts ? (
              <Skeleton.Input style={{ width: "100%" }} />
            ) : (
              <Input
                readOnly
                value={products?.data[0]?.name}
                style={{ width: "100%" }}
              />
            )}
          </div>
          <Form.Item
            label={"userId"}
            name={"userId"}
            style={{ display: "none" }}
          >
            {userId ? (
              <Input defaultValue={userId} value={userId} />
            ) : (
              <Skeleton.Input active />
            )}
          </Form.Item>
          <Form.Item name="quantity" label="quantity">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="status" label="status  ">
            <Select
              placeholder="Select a status"
              options={[
                { label: "Fulfilled", value: OrderStatus.FULFILLED },
                { label: "Defected", value: OrderStatus.DEFECTED },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AllCart>
  );
};
