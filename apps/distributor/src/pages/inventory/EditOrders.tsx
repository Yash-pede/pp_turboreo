import { DateField, useModalForm } from "@refinedev/antd";
import { AllOrders } from "./AllOrders";
import {
  GET_ALL_ORDERS_QUERY,
  UPDATE_ORDERS_MUTATION_DISTRIBUTOR,
} from "@repo/graphql";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useGo, useList } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import { OrderStatus } from "@repo/utility";
import { useEffect } from "react";

export const EditOrders = () => {
  const orderId = useLocation().pathname.split("/").pop();
  const go = useGo();
  const RouteToOrders = () => {
    go({
      to: { resource: "orders", action: "list" },
      type: "push",
      options: { keepQuery: true },
    });
  };
  const { modalProps, formProps, formLoading } = useModalForm({
    action: "edit",
    resource: "ORDERS",
    redirect: "show",
    id: orderId,
    defaultVisible: true,
    meta: {
      gqlMutation: UPDATE_ORDERS_MUTATION_DISTRIBUTOR,
    },
    onMutationSuccess() {
      RouteToOrders();
    },
  });

  const { data, isLoading } = useList({
    resource: "ORDERS",
    queryOptions: {
      meta: {
        gqlQuery: GET_ALL_ORDERS_QUERY,
      },
    },
    filters: [
      {
        field: "id",
        operator: "eq",
        value: orderId,
      },
    ],
  });
  useEffect(() => {
    if (!isLoading && formProps?.form) {
      formProps.form.setFieldsValue({ ...data?.data[0] });
    }
  }, [isLoading, formProps?.form, data?.data]);
  return (
    <AllOrders>
      <Modal
        {...modalProps}
        afterClose={RouteToOrders}
        confirmLoading={isLoading || formLoading}
      >
        <Form
          {...formProps}
          layout="vertical"
          style={{ width: "100%", gap: "10px" }}
        >
          <Form.Item style={{ width: "100%" }} name="id" label="Order Id">
            <Input min={1} style={{ width: "100%" }} readOnly />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="product_id"
            label="Product"
          >
            <Input min={1} style={{ width: "100%" }} readOnly />
          </Form.Item>

          <Form.Item style={{ width: "100%" }} name="quantity" label="Quantity">
            <InputNumber min={1} style={{ width: "100%" }} readOnly />
          </Form.Item>

          <Form.Item style={{ width: "100%" }} name="status" label="Status">
            <Select
              placeholder="Select a status"
              options={[
                { label: "Defected", value: OrderStatus.DEFECTED },
                { label: "Fulfilled", value: OrderStatus.FULFILLED },
              ]}
            />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="created_at"
            label="Created at"
          >
            <DateField
              value={data?.data[0].created_at}
              format="LLL"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AllOrders>
  );
};
