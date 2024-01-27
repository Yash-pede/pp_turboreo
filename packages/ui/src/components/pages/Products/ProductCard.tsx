import {
  INSERT_ORDER_MUTATION,
  INSERT_PRODUCT_BATCHES_MUTATION,
  Products,
} from "@repo/graphql";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Skeleton,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useNavigation } from "@refinedev/core";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useModalForm } from "@refinedev/antd";
import { authProvider } from "@repo/utility";
// import "./card.scss";

export const ProductCard = ({
  product,
  isLoading,
  WhereToAdd,
}: {
  product: Products;
  isLoading: boolean;
  WhereToAdd?: string;
}) => {
  const { Text, Paragraph, Title } = Typography;
  const { show } = useNavigation();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { formProps, modalProps } = useModalForm({
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
  };
  const HandleProductAdding = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("adding " + WhereToAdd);
    setOpen(true);
    if (WhereToAdd === "orders") {
      fetchUserId();
    }
  };

  return (
    <>
      <Card
        hoverable
        title={product.name}
        loading={isLoading}
        style={{ width: 300, cursor: "pointer" }}
        onClick={() => show("products", product.id)}
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
        <Title level={5}> &#x20b9; {product.price}</Title>
        <Text
          type="secondary"
          style={{ marginTop: "10px", textAlign: "right", width: "100%" }}
        >
          {dayjs(product.updated_at).format("hh:mm A DD MMM YYYY")}
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
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item label={"productId"} name={"productId"} style={{}}>
            <Input defaultValue={product.id} defaultChecked={product.id} />
          </Form.Item>
          <Form.Item label={"userId"} name={"userId"} style={{}}>
            {userId ? (
              <Input defaultValue={userId} />
            ) : (
              <Skeleton.Input active />
            )}
          </Form.Item>
          <Form.Item label={"name"} name={"name"}>
            <Input
              placeholder="Enter name"
              disabled
              defaultValue={product.name}
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
        </Form>
      </Modal>
    </>
  );
};
