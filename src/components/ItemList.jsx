import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { AuthContext } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_200/";
const FALLBACK_IMAGE = "https://via.placeholder.com/200?text=No+Image";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (info) => {
    if (!user) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1800);
      navigate("/login");
      return;
    }
    dispatch(addItem(info));
  };

  return (
    <div className="px-4 sm:px-6">
      {items.map((item) => {
        const info = item?.card?.info;

        const itemId = info?.id;
        const quantity = cartItems[itemId]?.quantity || 0;

        const price = ((info?.price ?? info?.defaultPrice) / 100)?.toFixed(0);

        const img = info?.imageId
          ? `${IMG_CDN_URL}${info.imageId}`
          : FALLBACK_IMAGE;

        return (
          <div
            key={itemId}
            className="flex justify-between py-8 border-b border-gray-200"
          >
            {/* LEFT SIDE TEXT */}
            <div className="w-8/12 text-left">
              <h3 className="font-bold text-xl text-gray-800">{info?.name}</h3>

              <p className="font-bold text-lg mt-2">₹{price}</p>

              {info?.description && (
                <p className="text-gray-500 mt-3 leading-7">
                  {info.description}
                </p>
              )}
            </div>

            {/* RIGHT SIDE IMAGE + BUTTON */}
            <div className="w-4/12 flex justify-end">
              <div className="relative w-40">
                <img
                  className="w-full h-[120px] object-cover rounded-2xl"
                  src={img}
                  alt={info?.name}
                />

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                  {quantity === 0 ? (
                    <button
                      className="bg-white text-green-600 font-bold px-10 py-2 rounded-xl shadow-md border border-gray-200"
                      onClick={() => handleAdd(info)}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-between px-4 py-2 w-[130px]">
                      <button
                        className="text-green-600 font-bold text-xl"
                        onClick={() => dispatch(removeItem(itemId))}
                      >
                        -
                      </button>

                      <span className="text-green-600 font-bold text-lg">
                        {quantity}
                      </span>

                      <button
                        className="text-green-600 font-bold text-xl"
                        onClick={() => handleAdd(info)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Toast show={showToast} message="Please login to add items to cart 🔒" />
    </div>
  );
};

export default ItemList;
