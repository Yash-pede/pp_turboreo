import { useShoppingCart } from "../../contexts/cart/ShoppingCartContext";
import { Alert, Button, Col, Drawer, Empty, Flex, Statistic } from "antd";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { useList, useCreateMany } from "@refinedev/core";
import { GET_ALL_pRODUCTS_QUERY } from "@repo/graphql";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import { authProvider } from "@repo/utility";

export const ShoppingCart = ({ isOpen }: { isOpen: boolean }) => {
  const { cartItems, closeCart, clearCart } = useShoppingCart();
  const { data } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
    },
  });
  const { mutate, isSuccess } = useCreateMany();
  const HandleCheckout = async () => {
    console.log(cartItems);
    try {
      if (!authProvider.getIdentity) {
        return;
      }
      const user = await authProvider.getIdentity();
      const userId = user as any;

      mutate({
        resource: "ORDERS",
        values: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity + item.quantity / 5,
          user_id: userId.id,
        })),
      });

      console.log("Checkout successful!");
      console.log(isSuccess);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <Drawer title="Basic Drawer" open={isOpen} onClose={closeCart} size="large">
      <Button
        type="primary"
        size="large"
        disabled={cartItems.length === 0}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0",
          gap: "10px",
        }}
        onClick={HandleCheckout}
      >
        <IconShoppingBagCheck /> Checkout
      </Button>
      <Alert
        style={{ margin: "10px 0" }}
        message="Quantity Scheme: 5 + 1"
        description="For every 5 products ordered, the actual quantity will be increased by 1."
        showIcon
        type="info"
      />
      {cartItems.length > 0 ? (
        <>
          <Col span={24}>
            {cartItems.map((item) => (
              <ShoppingCartItem key={item.id} products={data?.data} {...item} />
            ))}
          </Col>
          <Flex justify="end">
            <Statistic
              title="Total"
              precision={2}
              style={{ marginRight: "16px", fontWeight: "bold" }}
              value={
                "₹" +
                cartItems.reduce((total, item) => {
                  const product = data?.data?.find((p) => p.id === item.id);
                  return total + (product?.mrp || 0) * item.quantity;
                }, 0)
              }
            />
          </Flex>
        </>
      ) : (
        <Empty description="Your cart is empty" />
      )}
    </Drawer>
  );
};
