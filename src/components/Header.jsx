import { LOGO_URL } from "../utils/constants";
import DashDineLogo from "../assets/dashdinejpg.jpg";
// console.log("DashDineLogo:", DashDineLogo);

import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  // total cart count
  const totalCount = Object.values(cartItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ---------------- Location (City Name) ----------------
  const [locationText, setLocationText] = useState("Detect Location");

  const getCityFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      const address = data?.address;

      const city =
        address?.city ||
        address?.town ||
        address?.village ||
        address?.suburb ||
        "";

      const state = address?.state || "";
      const country = address?.country || "";

      const finalLocation = [city, state, country].filter(Boolean).join(", ");

      return finalLocation || "Location Found";
    } catch (err) {
      return "Unable to fetch city";
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationText("Location not supported");
      return;
    }

    setLocationText("Detecting...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const cityName = await getCityFromCoords(lat, lng);
        setLocationText(cityName);
      },
      () => {
        setLocationText("Permission denied");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };
  // -----------------------------------------------------

  const location = useLocation();

  const navLinkClass = (path) =>
    `relative px-2 py-2 font-semibold transition ${
      location.pathname === path
        ? "text-orange-600"
        : "text-gray-700 hover:text-orange-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* LEFT: Logo + Location */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={LOGO_URL}
                alt="DashDine Logo"
                className="w-16 h-16 object-contain"
              />

              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                DashDine
              </span>
            </Link>

           
            {/* Location ----------------------*/}
            <button
              onClick={getUserLocation}
              className="hidden md:flex items-center justify-between gap-3 
             px-5 py-2.5 rounded-full 
             border border-gray-200 bg-white 
             shadow-sm hover:shadow-md 
             hover:bg-gray-50 transition-all duration-200
             min-w-auto max-w-[360px]"
              title="Click to detect your location"
            >
              {/* Left side: Icon + Text */}
              <div className="flex items-center gap-2 min-w-0">
                {/* Location SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-gray-500 shrink-0"
                >
                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                {/* Location Text */}
                <span className="text-[15px] font-medium text-gray-700 truncate">
                  {locationText}
                </span>
              </div>
              <span className="text-gray-400 text-sm shrink-0">▾</span>
            </button>

          </div>

          {/* RIGHT: Nav */}
          <nav className="flex items-center gap-4">
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

              <li className="hidden md:block">
                <Link to="/grocery" className={navLinkClass("/grocery")}>
                  Grocery
                  {location.pathname === "/grocery" && (
                    <span className="absolute left-2 right-2 -bottom-1 h-0.5 bg-orange-600 rounded-full"></span>
                  )}
                </Link>
              </li>

              {/* Cart */}
              <li>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-800 hover:text-orange-600 transition">
                    Cart
                  </span>

                  <span className="min-w-[26px] h-[22px] px-2 flex items-center justify-center rounded-md bg-green-600 text-white text-sm font-bold">
                    {totalCount}
                  </span>
                </Link>
              </li>
            </ul>

            {/* Login Button */}
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
        </div>
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
