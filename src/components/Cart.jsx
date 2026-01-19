import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItemsObj = useSelector((store) => store.cart.items);
  const cartItems = Object.values(cartItemsObj);

  // total calculations
  const itemTotal = cartItems.reduce((sum, cartItem) => {
    const qty = cartItem?.quantity ?? 0;
    const price =
      (cartItem?.info?.price ?? cartItem?.info?.defaultPrice ?? 0) / 100;

    return sum + price * qty;
  }, 0);

  const GST_RATE = 0.08; // 8%
  const gst = itemTotal * GST_RATE;
  const toPay = itemTotal + gst;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Cart</h1>

          <button
            className="px-4 py-2 bg-amber-500 text-white rounded-xl shadow-md transition-all duration-200 hover:bg-amber-600 hover:scale-[1.02] active:scale-95"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Add your favorite dishes from the menu to show them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Items in your cart
                </h2>

                <div className="divide-y">
                  {cartItems.map((cartItem) => {
                    const info = cartItem?.info;
                    const qty = cartItem?.quantity ?? 0;

                    const price = (
                      (info?.price ?? info?.defaultPrice ?? 0) / 100
                    ).toFixed(0);

                    return (
                      <div
                        key={info?.id}
                        className="py-5 flex items-start justify-between gap-4"
                      >
                        {/*item info */}
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-lg text-gray-900 leading-snug">
                            {info?.name}
                          </h3>

                          <p className="mt-1 text-gray-800 font-semibold">
                            ₹{price}
                          </p>

                          {info?.description && (
                            <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                              {info.description}
                            </p>
                          )}
                        </div>

                        {/*quantity */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center justify-between w-[140px] border border-gray-200 rounded-xl shadow-sm px-3 py-2 bg-white">
                            <button
                              className="text-2xl font-bold text-gray-500 hover:text-gray-700 active:scale-95 transition"
                              onClick={() => dispatch(removeItem(info?.id))}
                            >
                              −
                            </button>

                            <span className="text-lg font-bold text-green-600">
                              {qty}
                            </span>

                            <button
                              className="text-2xl font-bold text-green-600 hover:text-green-700 active:scale-95 transition"
                              onClick={() => dispatch(addItem(info))}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/*Bill Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-5 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Bill Details
                </h2>

                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="font-semibold">
                      ₹{itemTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST & Other Charges</span>
                    <span className="font-semibold">₹{gst.toFixed(2)}</span>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between text-lg font-extrabold text-gray-900">
                    <span>TO PAY</span>
                    <span>₹{toPay.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full mt-5 py-3 rounded-xl bg-green-600 text-white font-bold shadow-md hover:bg-green-700 active:scale-95 transition">
                  Proceed to Pay
                </button>

                
              </div>

              {/*Review Note */}
              <div className="w-full mt-6">
                <div className="border border-gray-200 rounded-2xl bg-white shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Review your order and address details to avoid cancellations
                  </h3>

                  <p className="text-gray-700 mt-4 leading-relaxed">
                    <span className="font-semibold">Note:</span> Please ensure
                    your address and order details are correct. This order, if
                    cancelled, is non-refundable.
                  </p>

                  <button className="mt-5 text-orange-500 font-semibold  hover:text-orange-600 transition">
                    Read policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

// import { useDispatch, useSelector } from "react-redux";
// import ItemList from "./ItemList";
// import { clearCart } from "../utils/cartSlice";

// const Cart = () => {
//   //  This is now an OBJECT (not array) after we made cart dynamic
//   // const cartItems = useSelector((store) => store.cart.items);

//   //store.cart.items is object now, so take values -> array
//   const cartItemsObj = useSelector((store) => store.cart.items);
//   const cartItems = Object.values(cartItemsObj);

//   const dispatch = useDispatch();

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div className="text-center m-4 p-4">
//       <h1 className="text-2xl font-bold text-amber-600">Cart</h1>
//       <div className="w-6/12 m-auto">
//         <button
//           className="p-1 m-2 bg-amber-500 text-white rounded-lg transition-all duration-200 hover:bg-amber-600 hover:scale-105 active:scale-95"
//           onClick={handleClearCart}
//         >
//           Clear Cart
//         </button>

//         {cartItems.length === 0 && (
//           <h1 className="text-amber-500">
//             Cart is empty, add items to the cart!
//           </h1>
//         )}

//         <ItemList items={cartItems} />
//       </div>
//     </div>
//   );
// };

// export default Cart;
