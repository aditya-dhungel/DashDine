import { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detectUserLocation } from "../utils/location";
import useOnlineStatus from "../utils/useOnlineStatus";
import { AuthContext } from "../utils/AuthContext";
import { clearCart } from "../utils/cartSlice";

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=111827&color=ffffff";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const totalCount = Object.values(cartItems).reduce(
    (sum, item) => sum + (item?.quantity ?? 0),
    0
  );

  const [locationText, setLocationText] = useState("Detect Location");
  const location = useLocation();

  const navLinkClass = (path) =>
    `relative px-2 py-2 font-semibold transition ${
      location.pathname === path
        ? "text-orange-600"
        : "text-gray-700 hover:text-orange-600"
    }`;

  // mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  // online status
  const onlineStatus = useOnlineStatus();

  // profile dropdown (desktop only)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logout();
    dispatch(clearCart());
    setIsProfileOpen(false);
    closeMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
                  Dash<span className="text-orange-500">Dine</span>
                </span>

                {/* online/offline sign */}
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    onlineStatus ? "bg-green-500" : "bg-red-500"
                  }`}
                  title={onlineStatus ? "Online" : "Offline"}
                ></span>
              </div>
            </Link>

            {/* Desktop Location */}
            <button
              onClick={() => detectUserLocation(setLocationText)}
              className="hidden md:flex items-center justify-between gap-2 
               px-4 py-2 rounded-full 
               border border-gray-200 bg-white 
               shadow-sm hover:shadow-md 
               hover:bg-gray-50 transition-all duration-200
               max-w-[300px]"
              title="Click to detect your location"
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Location SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-orange-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>

                <span className="text-sm font-medium text-gray-700 truncate">
                  {locationText}
                </span>
              </div>

              <span className="text-gray-400 text-xs shrink-0">▾</span>
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Mobile Location */}
            <button
              onClick={() => detectUserLocation(setLocationText)}
              className="md:hidden ml-2 px-2.5 py-1.5 rounded-full 
              border border-gray-200 bg-white shadow-sm 
              hover:bg-gray-50 transition flex items-center gap-1.5 
              max-w-[130px]"
              title="Detect location"
            >
              <span className="text-xs font-semibold text-gray-700 truncate">
                {locationText}
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4">
              <ul className="flex items-center gap-2">
                <li>
                  <Link to="/" className={navLinkClass("/")}>
                    Home
                    {location.pathname === "/" && (
                      <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-orange-600 rounded-full"></span>
                    )}
                  </Link>
                </li>

                <li className="hidden sm:block">
                  <Link to="/about" className={navLinkClass("/about")}>
                    About
                    {location.pathname === "/about" && (
                      <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-orange-600 rounded-full"></span>
                    )}
                  </Link>
                </li>

                <li className="hidden sm:block">
                  <Link to="/contact" className={navLinkClass("/contact")}>
                    Contact
                    {location.pathname === "/contact" && (
                      <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-orange-600 rounded-full"></span>
                    )}
                  </Link>
                </li>

                <li className="hidden lg:block">
                  <Link to="/grocery" className={navLinkClass("/grocery")}>
                    Grocery
                    {location.pathname === "/grocery" && (
                      <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-orange-600 rounded-full"></span>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:scale-[1.05] hover:bg-gray-100 transition"
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
                </li>
              </ul>

              {/* Desktop Profile Dropdown / Login */}
              <div className="hidden md:block">
                {user ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen((prev) => !prev)}
                      title="Account"
                      className="relative group"
                    >
                      {/*Ring */}
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-400 p-[2px] shadow-sm group-hover:shadow-md transition">
                        <div className="w-full h-full rounded-full bg-white p-[2px]">
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <img
                              src={user?.photoURL || FALLBACK_AVATAR}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Glow */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition blur-md bg-orange-200 -z-10"></div>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-slideUp">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <img
                              src={user?.photoURL || FALLBACK_AVATAR}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {user?.displayName || "User"}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user?.email || "No email"}
                            </p>
                          </div>
                        </div>

                        <div className="p-3">
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 rounded-xl font-semibold transition shadow-sm active:scale-95 bg-red-500 text-white hover:bg-red-600"
                          >
                            Logout
                          </button>

                          <p className="mt-3 text-[11px] text-gray-400 text-center">
                            You will be signed out from DashDine
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="px-4 py-2 rounded-xl font-semibold transition shadow-sm active:scale-95 bg-orange-500 text-white hover:bg-orange-600"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                )}
              </div>
            </nav>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              onClick={closeMenu}
            >
              <span className="font-semibold text-gray-800">Cart</span>
              <span
                className={`min-w-[26px] h-[22px] px-2 flex items-center justify-center rounded-md text-white text-sm font-bold ${
                  totalCount === 0 ? "bg-orange-500" : "bg-green-600"
                }`}
              >
                {totalCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-2 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col items-center text-center">
                {/* Profile section in mobile menu ONLY */}
                {user && (
                  <div className="w-full px-4 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-orange-500 via-orange-400 to-yellow-400 p-0.5 shadow-sm">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={user?.photoURL || FALLBACK_AVATAR}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-left min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>
                )}

                <Link
                  to="/"
                  className="w-full px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
                  onClick={closeMenu}
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="w-full px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
                  onClick={closeMenu}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="w-full px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
                  onClick={closeMenu}
                >
                  Contact
                </Link>

                <Link
                  to="/grocery"
                  className="w-full px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
                  onClick={closeMenu}
                >
                  Grocery
                </Link>

                {!user ? (
                  <button
                    className="m-3 w-[90%] px-4 py-3 rounded-xl font-semibold transition shadow-sm active:scale-95 bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => {
                      closeMenu();
                      handleLoginClick();
                    }}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="m-3 w-[90%] px-4 py-3 rounded-xl font-semibold transition shadow-sm active:scale-95 bg-red-500 text-white hover:bg-red-600"
                    onClick={async () => {
                      await handleLogout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


