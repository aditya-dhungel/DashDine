import { Link } from "react-router-dom";

const NavLink = ({ to, label, isActive, onClick }) => (
  <li>
    <Link
      to={to}
      className={`relative px-2 py-2 font-semibold transition ${
        isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
      }`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-orange-600 rounded-full" />
      )}
    </Link>
  </li>
);

export default NavLink;
