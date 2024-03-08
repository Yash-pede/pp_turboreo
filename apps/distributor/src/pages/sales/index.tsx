import { PlusOutlined } from "@ant-design/icons";
import { CreateButton } from "@refinedev/antd";

export const SalesHome = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div>
        <CreateButton icon={<PlusOutlined />} />
      </div>
      {children}
    </>
  );
};
