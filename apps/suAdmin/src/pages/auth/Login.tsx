import React from "react";
import { authProvider } from "@repo/utility";
import { redirect } from "react-router-dom";
import { AuthPage } from "@refinedev/antd";
import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification/interface";

export function Login() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({
    placement,
    description,
  }: {
    placement: NotificationPlacement;
    description: string;
  }) => {
    api.info({
      message: `Notification ${placement}`,
      description: description,
      placement,
    });
  };
  return (
    <AuthPage
      type="login"
      formProps={{
        onSubmitCapture(values) {
          authProvider
            .login(values)
            .then(
              (response: {
                error: { message: any };
                success: any;
                redirectTo: any;
              }) => {
                console.log(response);
                if (response.error) {
                  openNotification({
                    placement: "topRight",
                    description: response.error.message,
                  });
                }
                if (response.success) {
                  openNotification({
                    placement: "topRight",
                    description: "Login Successful",
                  });
                  redirect(response.redirectTo || "/");
                }
              }
            );
        },
      }}
    />
  );
}
