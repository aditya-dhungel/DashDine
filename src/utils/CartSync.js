import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthContext";
import { setCart, clearCart } from "./cartSlice";
import { db } from "./firebase";

const CartSync = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const isFirstLoad = useRef(true);

  //  Load cart on login
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        dispatch(clearCart());
        return;
      }

      try {
        const docRef = db.collection("carts").doc(user.uid);
        const snap = await docRef.get();

        if (snap.exists) {
          const data = snap.data();
          dispatch(setCart(data?.items || {}));
        } else {
          dispatch(setCart({}));
        }
      } catch (err) {
        console.log("Cart load error:", err);
      } finally {
        isFirstLoad.current = false;
      }
    };

    loadCart();
  }, [user, dispatch]);

  //Save cart whenever cart changes
  useEffect(() => {
    const saveCart = async () => {
      if (!user) return;
      if (isFirstLoad.current) return;

      try {
        const docRef = db.collection("carts").doc(user.uid);
        await docRef.set({ items: cartItems }, { merge: true });
      } catch (err) {
        console.log("Cart save error:", err);
      }
    };

    saveCart();
  }, [cartItems, user]);

  return null;
};

export default CartSync;
