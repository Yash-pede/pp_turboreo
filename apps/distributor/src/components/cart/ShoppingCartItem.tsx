import { useShoppingCart } from "../../contexts/cart/ShoppingCartContext";
import { Button, Descriptions, Flex, Image, Statistic } from "antd";
import { Products } from "@repo/graphql";
import { IconX } from "@tabler/icons-react";

type ShoppingCartItemProps = {
  id: string;
  quantity: number;
  products: any;
};

export const ShoppingCartItem = ({
  id,
  quantity,
  products,
}: ShoppingCartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = products.find((product: Products) => product.id === id);
  if (!item) return null;
  return (
    <Flex
      style={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.8rem",
      }}
    >
      <Image
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "5px",
          objectFit: "cover",
        }}
        src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${item.imageURL}`}
      />
      <Descriptions
        extra={
          <Button type="primary" danger onClick={() => removeFromCart(id)}>
            <IconX />
          </Button>
        }
        title={item.name}
      >
        <Descriptions.Item label="Quantity">{quantity}</Descriptions.Item>
        <Descriptions.Item label="Price">${item.mrp}</Descriptions.Item>
        <Descriptions.Item>
          <Statistic title="Total" value={quantity * item.mrp} precision={2} />
        </Descriptions.Item>
      </Descriptions>
    </Flex>
  );
};
