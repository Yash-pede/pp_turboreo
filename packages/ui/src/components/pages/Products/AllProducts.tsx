import { useGo, useList } from "@refinedev/core";
import { ALL_PRODUCTS_QUERY, INSERT_PRODUCT_MUTATION } from "@repo/graphql";
import { ProductCard } from "./ProductCard";
import {
  Button,
  Card,
  Drawer,
  Flex,
  Form,
  GetProp,
  Input,
  InputNumber,
  Upload,
  UploadProps,
  message,
} from "antd";
import { IconShoppingCart } from "@tabler/icons-react";
import { InboxOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import { Create, useDrawerForm } from "@refinedev/antd";
import { supabaseClient } from "@repo/utility";

export const AllProducts = ({ whereToAdd }: { whereToAdd?: string }) => {
  const { data, isLoading } = useList({
    resource: "products",
    meta: {
      gqlQuery: ALL_PRODUCTS_QUERY,
    },
  });
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const { formProps, drawerProps, show, saveButtonProps } = useDrawerForm({
    action: "create",
    resource: "products",
    meta: {
      gqlMutation: INSERT_PRODUCT_MUTATION,
    },
  });
  const { Dragger } = Upload;
  const go = useGo();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
      </div>
    );
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt5M = file.size / 1024 / 1024 < 4;
    if (!isLt5M) {
      message.error("Image must smaller than 4MB!");
    }
    return isJpgOrPng && isLt5M;
  };
  const props: UploadProps = {
    name: "file",
    multiple: false,
    customRequest: async ({ file, onSuccess, filename, onError }) => {
      try {
        const timestamp = Date.now();
        const fileName = `images/${timestamp}-${filename}`;

        const { data, error } = await supabaseClient.storage
          .from("Products")
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        onSuccess && onSuccess("product Image");

        // Access the uploaded file URL from data.url
        console.log("File uploaded successfully:", data.url);
        formProps.form.setFieldValue("imageURL", fileName);
        // Access the uploaded file URL from data.url
        console.log("File uploaded successfully:", data.url);
      } catch (error: any) {
        console.error("Error uploading file:", error.message);
        onError && onError(error);
      }
    },

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div style={{ gap: "15px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        {whereToAdd === "stock" && (
          <Button
            type="primary"
            size="large"
            style={{
              gap: "15px",
              marginTop: "15px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => show()}
          >
            <PlusCircleTwoTone /> Add Products
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          style={{
            gap: "15px",
            marginTop: "15px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            go({
              to: { resource: "orders", action: "list" },
              type: "push",
              options: {
                keepQuery: true,
              },
            })
          }
        >
          <IconShoppingCart /> {whereToAdd}
        </Button>
      </div>
      <Flex
        wrap="wrap"
        gap="small"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.data.map((product: any) => (
          <ProductCard
            product={product}
            isLoading={isLoading}
            key={product.id}
            WhereToAdd={whereToAdd || "orders"}
          />
        ))}
      </Flex>
      <Drawer {...drawerProps}>
        <Create saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Image"
              name="imageURL"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Dragger {...props} beforeUpload={beforeUpload} maxCount={1}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support only for a single upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </Create>
      </Drawer>
    </div>
  );
};
