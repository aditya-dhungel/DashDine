import { Link } from "react-router-dom";

const CartButton = ({ totalCount, onClick, className = "" }) => (
  <Link
    to="/cart"
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition ${className}`}
  >
    <span className="font-semibold text-gray-800 hover:text-orange-600 transition">
      Cart
    </span>
    <span
      className={`min-w-[26px] h-[22px] px-2 flex items-center justify-center rounded-md text-white text-sm font-bold ${
        totalCount === 0 ? "bg-orange-500" : "bg-green-600"
      }`}
    >
      {totalCount}
    </span>
  </Link>
);

export default CartButton;
