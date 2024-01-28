import { Form, Input, Modal, Select, Skeleton } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo, useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY, UPDATE_ORDER_MUTATION } from "@repo/graphql";
import { OrderStatus, authProvider } from "@repo/utility";
import { AllCart } from "./AllCart";
import React, { useEffect } from "react";

export const EditOrders = () => {
  const [userId, setUserId] = React.useState<string>();

  const go = useGo();
  const goToList = () => {
    go({
      to: { resource: "orders", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };
  const { modalProps, formProps, queryResult } = useModalForm({
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
    const fetchingUser = async () => {
      if (authProvider.getIdentity) {
        const user: any = await authProvider.getIdentity();
        setUserId(user.id);
      }
    };
    fetchingUser();
  });
  return (
    <AllCart>
      <Modal {...modalProps} mask={true} onCancel={goToList} title="Edit Order">
        <Form {...formProps} layout="vertical">
          <Form.Item name="id" label="OrderID">
            <Input disabled />
          </Form.Item>
          <Form.Item name="productName" label="productName">
            {isLoadingProducts ? (
              <Skeleton.Input />
            ) : (
              <Input disabled defaultValue={products?.data[0]?.name} />
            )}
          </Form.Item>
          <Form.Item label={"userId"} name={"userId"}>
            {userId ? (
              <Input defaultValue={userId} value={userId} />
            ) : (
              <Skeleton.Input active />
            )}
          </Form.Item>
          <Form.Item name="quantity" label="quantity">
            <Input disabled />
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
