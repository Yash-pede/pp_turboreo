import { Flex, Skeleton } from "antd";

export const Home = () => {
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
