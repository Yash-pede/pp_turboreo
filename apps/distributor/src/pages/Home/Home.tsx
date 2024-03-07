import { Flex, Skeleton } from "antd";
// import { useEffect } from "react";
// import { authProvider } from "../auth/authProvider";
// import { UseLocalStorage } from "@repo/ui";

export const Home = () => {
  // const [user, setUser] = UseLocalStorage<string>("USER", "");
  // useEffect(() => {
  //   if (!user) return;
  //   const userid = async () => {
  //     if (!authProvider.getIdentity) {
  //       return;
  //     }
  //     const user = await authProvider.getIdentity();
  //     const userId = user as any;
  //     setUser(userId);
  //   };
  //   userid();
  // }, []);

  return (
    <div>
      <div>Home page</div>
      <Flex>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Flex>
    </div>
  );
};
