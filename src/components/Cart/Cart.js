import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const products = useSelector((state) => state.cart.items);

  const cartItems = products.map((product) => {
    return (
      <CartItem
        key={product.id}
        item={{
          id:product.id,
          title: product.title,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
          price: product.price,
        }}
      />
    );
  });

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartItems}</ul>
    </Card>
  );
};

export default Cart;
