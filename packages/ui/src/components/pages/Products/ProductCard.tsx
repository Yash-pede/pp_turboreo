import {
  INSERT_ORDER_MUTATION,
  INSERT_PRODUCT_BATCHES_MUTATION,
  Product_Batches,
  Products,
} from "@repo/graphql";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Skeleton,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { BaseRecord, useGo } from "@refinedev/core";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useModalForm } from "@refinedev/antd";
import { authProvider } from "@repo/utility";
// import "./card.scss";

export const ProductCard = ({
  product,
  isLoading,
  WhereToAdd,
  stockProduct,
}: {
  product: Products;
  stockProduct?: BaseRecord | Product_Batches;
  isLoading: boolean;
  WhereToAdd?: string;
}) => {
  const { Text, Paragraph, Title } = Typography;
  const go = useGo();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { formProps, modalProps, formLoading } = useModalForm({
    action: "create",
    defaultVisible: false,
    resource: WhereToAdd === "stock" ? "product_batches" : "orders",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess(data, variables, context, isAutoSave) {
      console.log("onMutationSuccess", data, variables, context, isAutoSave);
      setOpen(false);
    },
    meta: {
      gqlMutation:
        WhereToAdd === "stock"
          ? INSERT_PRODUCT_BATCHES_MUTATION
          : INSERT_ORDER_MUTATION,
    },
  });
  const fetchUserId = async () => {
    const user: any =
      authProvider.getIdentity && (await authProvider.getIdentity());
    console.log("user", user.id);
    setUserId(user.id);
    form.setFieldsValue({
      userId: user.id,
    });
  };
  const HandleProductAdding = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("adding " + WhereToAdd);
    setOpen(true);

    if (WhereToAdd === "orders") {
      fetchUserId();
    }
    // form.submit();
  };

  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    const newQuantity = quantity + 5;
    setQuantity(newQuantity);
    form.setFieldsValue({
      quantity: newQuantity,
    });
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 5);
    setQuantity(newQuantity);
    form.setFieldsValue({
      quantity: newQuantity,
    });
  };
  form.setFieldsValue({
    productId: product.id,
  });
  return (
    <>
      {/* {JSON.stringify(stockProduct, null, 2)} */}
      <Card
        hoverable
        title={product.name}
        loading={isLoading}
        style={{ width: 300, cursor: "pointer" }}
        onClick={() =>
          go({
            to: { resource: "products", id: product.id, action: "show" },
            type: "push",
            options: { keepQuery: true },
          })
        }
      >
        <img
          src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${product.imageURL}`}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
        <Paragraph
          style={{
            marginTop: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.description}
        </Paragraph>
        <Title level={5}>{stockProduct?.price}</Title>
        <Text
          type="secondary"
          style={{ marginTop: "10px", textAlign: "right", width: "100%" }}
        >
          {dayjs(stockProduct?.expiryDate || product.updated_at).format(
            "hh:mm A DD MMM YYYY"
          )}
        </Text>
        <Button
          type="primary"
          size="large"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            HandleProductAdding(e)
          }
          style={{ display: "block", marginTop: "10px", width: "100%" }}
        >
          <ShoppingCartOutlined /> Add to {WhereToAdd}
        </Button>
      </Card>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={() => setOpen(false)}
        open={open}
        okButtonProps={{
          style: { display: "ruby" },
          onClick: () => form.submit(),
        }}
        confirmLoading={formLoading}
        width={512}
      >
        <Title level={4} style={{ textAlign: "center", marginBottom: "10px" }}>
          {product.name}
        </Title>
        <Form {...formProps} layout="vertical" form={form}>
          <Form.Item
            label={"productId"}
            name={"productId"}
            style={{ display: "none" }}
            rules={[{ required: true, message: "Please input ProductId!" }]}
          >
            <Input readOnly />
          </Form.Item>
          {WhereToAdd === "orders" && (
            <>
              <Form.Item
                label={"userId"}
                name={"userId"}
                style={{ display: "none" }}
                rules={[{ required: true, message: "Please input UserId" }]}
              >
                {userId ? <Input readOnly /> : <Skeleton.Input active />}
              </Form.Item>
              <Form.Item
                label={"quantity"}
                name={"quantity"}
                rules={[{ required: true, message: "Enter quantity" }]}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={handleDecrement}>-</Button>
                  <InputNumber
                    readOnly
                    placeholder="Enter quantity"
                    value={quantity}
                    style={{ width: "100%" }}
                    onChange={(value) => setQuantity(value as number)}
                  />
                  <Button onClick={handleIncrement}>+</Button>
                </div>
              </Form.Item>
            </>
          )}
          {WhereToAdd === "stock" && (
            <>
              <Form.Item
                label={"Batch No"}
                name={"batchNo"}
                style={{}}
                rules={[{ required: true, message: "Please input Batch No!" }]}
              >
                <Input placeholder="Enter Batch No" />
              </Form.Item>
              <Form.Item
                label={"expiryDate"}
                name={"expiryDate"}
                style={{}}
                rules={[
                  { required: true, message: "Please input Expiry Date!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label={"price"} name={"price"}>
                <InputNumber
                  min={1}
                  placeholder="Enter price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label={"quantity"}
                name={"quantity"}
                rules={[{ required: true, message: "Enter quantity" }]}
              >
                <InputNumber
                  placeholder="Enter quantity"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};
