import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // item structure: { info, qty }
  const info = item?.info;
  const qty = item?.qty ?? 0;

  const price =
    ((info?.price ?? info?.defaultPrice ?? 0) / 100).toFixed(0) || 0;

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4">
      {/* LEFT SIDE */}
      <div className="w-8/12 text-left">
        <h2 className="font-semibold text-lg text-gray-800">{info?.name}</h2>

        <p className="text-gray-600 font-medium">₹{price}</p>

        {info?.description && (
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {info.description}
          </p>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-4/12 flex flex-col items-end gap-2">
        {/* Swiggy style counter */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100"
            onClick={() => dispatch(removeItem(info?.id))}
          >
            -
          </button>

          <span className="px-4 py-2 font-semibold text-green-600">{qty}</span>

          <button
            className="px-4 py-2 text-lg font-bold text-green-600 hover:bg-gray-100"
            onClick={() => dispatch(addItem(info))}
          >
            +
          </button>
        </div>

        <p className="text-gray-400 text-sm">Customisable</p>
      </div>
    </div>
  );
};

export default CartItemCard;
