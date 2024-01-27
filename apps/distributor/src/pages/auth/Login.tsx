import { authProvider } from "./authProvider";
import { redirect } from "react-router-dom";
import { AuthPage } from "@refinedev/antd";
import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification/interface";

export function Login() {
  const [api] = notification.useNotification();
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
              (response: any) => {
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
