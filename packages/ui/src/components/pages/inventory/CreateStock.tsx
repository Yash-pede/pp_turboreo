import { useModalForm } from "@refinedev/antd";
import { INSERT_INTO_STOCKS_MUTATION } from "@repo/graphql";
import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useLocation } from "react-router-dom";

export const CreateStock = () => {
  const { formProps, modalProps } = useModalForm({
    defaultVisible: true,
    action: "create",
    resource: "STOCKS",
    redirect: "show",
    meta: {
      mutationMode: "pessimistic",
      gqlQuery: INSERT_INTO_STOCKS_MUTATION,
    },
  });
  const productIdFromUrl = useLocation().search.split("=")[1];
  formProps.initialValues = {
    product_id: productIdFromUrl,
  };
  return (
    <>
      <Modal {...modalProps}>
        <Form
          {...formProps}
          layout="inline"
          style={{ width: "100%", gap: "10px" }}
        >
          <Form.Item
            style={{ width: "100%" }}
            name="product_id"
            label="Product"
          >
            <InputNumber readOnly style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="avalable_quantity"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="selling_price"
            label="Selling Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="batch_no"
            label="Batch No"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="expiry_date"
            label="Expiry Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
