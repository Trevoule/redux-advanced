import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/Notification/Notification";
import { sendCartData } from "./components/store/cart-slice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    // const sendCartData = async () => {
    // //   dispatch(
    // //     uiActions.showNotification({
    // //       status: "pending",
    // //       title: "Sending...",
    // //       message: "Sending Cart data",
    // //     })
    // //   );
    // //   const response = await fetch(
    // //     "https://react-fetch-movies-12638-default-rtdb.firebasio.com/cart.json",
    // //     {
    // //       method: "PUT",
    // //       body: JSON.stringify(cart),
    // //     }
    // //   );
    // //   if (!response.ok) {
    // //     dispatch(
    // //       uiActions.showNotification({
    // //         status: "error",
    // //         title: "Error",
    // //         message: "Sending data failed!",
    // //       })
    // //     );
    // //   }
    // //   dispatch(
    // //     uiActions.showNotification({
    // //       status: "success",
    // //       title: "Success",
    // //       message: "Sent cart data successfully!",
    // //     })
    // //   );
    // };
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error",
    //       message: "Sending data failed!",
    //     })
    //   );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
