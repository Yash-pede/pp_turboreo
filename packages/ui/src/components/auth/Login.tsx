import { useGo } from "@refinedev/core";
import "./login.css";
import { LoginSVG } from "@repo/shared";
import { UserRoleTypes, supabaseClient } from "@repo/utility";
import { Button, Form, Input, Typography, notification } from "antd";
import React from "react";
import axios from "axios";

export const LoginNew = ({ userType }: { userType: UserRoleTypes }) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [IsUserRoleTrue, setIsUserRoleTrue] = React.useState(false);
  const go = useGo();
  type NotificationType = "success" | "info" | "warning" | "error";

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const checkUser = async () => {
    try {
      const response = await axios.post(
        "https://krtkfjphiovnpjawcxwo.supabase.co/graphql/v1",
        {
          query: `
            query GetProfileByIdAndUserRole($filter: profilesFilter) {
              profilesCollection(filter: $filter) {
                edges {
                  node {
                    id
                    userrole
                  }
                }
              }
            }`,
          variables: {
            filter: {
              email: {
                eq: Email,
              },
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGtmanBoaW92bnBqYXdjeHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQzNzMsImV4cCI6MjAxNzE4MDM3M30.rNWu78HUY5Yk6zTegL0Z0-dCiTqkU6wIifiTJQ3S_wQ",
          },
        },
      );

      const result = response.data;
      //   console.log(result);
      if (
        result.data.profilesCollection.edges[0].node.userrole ===
        UserRoleTypes[userType]
      ) {
        setIsUserRoleTrue(true);
      } else {
        setIsUserRoleTrue(false);
        openNotificationWithIcon(
          "error",
          "Login Failed",
          "You are not authorized to login",
        );
        setIsLoading(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      openNotificationWithIcon("error", "Login Failed", "Please try again");
      setIsLoading(false);
      form.resetFields();
      setIsUserRoleTrue(false);
    }
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    // console.log("Form values:", values);
    const email = values.email;
    const password = values.password;
    checkUser();
    if (IsUserRoleTrue) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          openNotificationWithIcon("error", "Login Failed", error.message);
          setIsLoading(false);
          form.resetFields();
        }

        if (data?.user) {
          openNotificationWithIcon(
            "success",
            "Login Successful",
            "Login Successful",
          );
          setIsLoading(false);
          form.resetFields();
          go({
            to: "/",
          });
        }
      } catch (error: any) {
        openNotificationWithIcon("error", "Login Failed", error.message);
        setIsLoading(false);
        form.resetFields();
      }
    } else {
      openNotificationWithIcon(
        "error",
        "Login Failed",
        "Please verify your Identity first",
      );
      form.resetFields();
      setIsLoading(false);
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="login-form">
          <Form
            form={form}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
            style={{
              width: "50%",
              margin: "auto",
            }}
            title="Login"
          >
            <Title
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                marginTop: "2rem",
                fontWeight: "bold",
                fontSize: "2rem",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
              }}
            >
              Login Portal
            </Title>
            <Form.Item label="Email" name="email">
              <Input
                type="email"
                placeholder="Email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{
                  width: "100%",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="right-image-container">
          <img src={LoginSVG} alt="" className="right-image" />
        </div>
      </div>
    </>
  );
};
