import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../utils/AuthContext";
import { clearCart } from "../utils/cartSlice";
import { detectUserLocation } from "../utils/location";
import useOnlineStatus from "../utils/useOnlineStatus";

const useHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const cartItems = useSelector((store) => store.cart.items);
  const totalCount = Object.values(cartItems).reduce(
    (sum, item) => sum + (item?.quantity ?? 0),
    0
  );

  const [locationText, setLocationText] = useState("Detect Location");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLoginClick = () => navigate("/login");

  const handleLogout = async () => {
    await logout();
    dispatch(clearCart());
    setIsProfileOpen(false);
    closeMenu();
    navigate("/");
  };

  const handleDetectLocation = () => detectUserLocation(setLocationText);

  const navLinkClass = (path) =>
    `relative px-2 py-2 font-semibold transition ${
      location.pathname === path
        ? "text-orange-600"
        : "text-gray-700 hover:text-orange-600"
    }`;

  const isActive = (path) => location.pathname === path;

  return {
    user, onlineStatus, locationText, totalCount,
    isMenuOpen, setIsMenuOpen, closeMenu,
    isProfileOpen, setIsProfileOpen, profileRef,
    handleLoginClick, handleLogout, handleDetectLocation,
    navLinkClass, isActive,
  };
};

export default useHeader;