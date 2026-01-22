import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { detectUserLocation } from "../utils/location";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  const totalCount = Object.values(cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // location state
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

                {/* online/offline signn*/}
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    onlineStatus ? "bg-green-500" : "bg-red-500"
                  }`}
                  title={onlineStatus ? "Online" : "Offline"}
                ></span>
              </div>
            </Link>

            {/* Desktop Location  */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-gray-500 shrink-0"
                >
                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
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
            {/* Mobile Location*/}
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

              <button
                className={`px-4 py-2 rounded-xl font-semibold transition shadow-sm active:scale-95 ${
                  btnName === "Login"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-900 text-white hover:bg-black"
                }`}
                onClick={() => {
                  setBtnName(btnName === "Login" ? "Logout" : "Login");
                }}
              >
                {btnName}
              </button>
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

        {/* Mobile Menu*/}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="mt-2 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex flex-col items-center text-center">
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

                <button
                  className={`m-3 w-[90%] px-4 py-3 rounded-xl font-semibold transition shadow-sm active:scale-95 ${
                    btnName === "Login"
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
                  onClick={() => {
                    setBtnName(btnName === "Login" ? "Logout" : "Login");
                    // closeMenu();
                  }}
                >
                  {btnName}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



// import { LOGO_URL } from "../utils/constants";
// import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import UserContext from "../utils/UserContext";
// import { useSelector } from "react-redux";

// const Header = () => {
//   // console.log("logo import value:", logo);

//   //   let btnName = "Login";
//   const [btnName, setBtnName] = useState("Login");

//   const { loggedInUser } = useContext(UserContext);

//   //subscribing to the store using selector hook
//   const cartItems = useSelector((store) => store.cart.items);

// //new
//   const totalCount = Object.values(cartItems).reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   return (
//     <div className="sticky top-0 z-50 flex justify-between bg-amber-50 shadow-md">
//       <div className="logo-container">
//         <img className="w-30 h-30" src={LOGO_URL} />
//       </div>
//       <div className="flex items-center">
//         <ul className="flex p-4 m-4">
//           <li className="px-3 text-lg">
//             <Link to="/">Home</Link>
//           </li>
//           <li className="px-3 text-lg">
//             <Link to="/about">About Us</Link>
//           </li>
//           <li className="px-3 text-lg">
//             <Link to="/contact">Contact Us</Link>
//           </li>
//           <li className="px-3 text-lg">
//             <Link to="/grocery">Grocery</Link>
//           </li>
//           <li className="px-3 text-lg">
//             <Link to="/cart">Cart 🛒({totalCount})</Link>
//           </li>
//           <button
//             className="px-3 text-lg"
//             onClick={() => {
//               btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
//             }}
//           >
//             {btnName}
//           </button>
//           {/* <li className="px-3 text-lg font-bold">{loggedInUser}</li> */}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;
