import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // item structure: { info, quantity }
  const info = item?.info;
  const qty = item?.quantity ?? 0;

  const price = (
    (info?.price ?? info?.defaultPrice ?? 0) / 100
  ).toFixed(0);

  return (
    <div className="py-5 flex items-start justify-between gap-4">
      {/*Item Info */}
      <div className="flex-1 text-left">
        <h3 className="font-bold text-lg text-gray-900 leading-snug">
          {info?.name}
        </h3>

        <p className="mt-1 text-gray-800 font-semibold">₹{price}</p>

        {info?.description && (
          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
            {info.description}
          </p>
        )}
      </div>

      {/* Quantity Counter */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center justify-between w-[140px] border border-gray-200 rounded-xl shadow-sm px-3 py-2 bg-white">
          <button
            className="text-2xl font-bold text-gray-500 hover:text-gray-700 active:scale-95 transition"
            onClick={() => dispatch(removeItem(info?.id))}
          >
            −
          </button>

          <span className="text-lg font-bold text-green-600">{qty}</span>

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
};

export default CartItemCard;
