import { Link } from "react-router-dom";
import useHeader from "../utils/useHeader";
import NavLink from "./header/NavLink";
import CartButton from "./header/CartButton";
import LocationButton from "./header/LocationButton";
import ProfileDropdown from "./header/ProfileDropdown";
import MobileMenu from "./header/MobileMenu";
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About", className: "hidden sm:block" },
  { to: "/contact", label: "Contact", className: "hidden sm:block" },
  { to: "/grocery", label: "Grocery", className: "hidden lg:block" },
];

const Header = () => {
  const {
    user, onlineStatus, locationText, totalCount,
    isMenuOpen, setIsMenuOpen, closeMenu,
    isProfileOpen, setIsProfileOpen, profileRef,
    handleLoginClick, handleLogout, handleDetectLocation,
    isActive,
  } = useHeader();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
                Dash<span className="text-orange-500">Dine</span>
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${onlineStatus ? "bg-green-500" : "bg-red-500"}`}
                title={onlineStatus ? "Online" : "Offline"}
              />
            </Link>

            <LocationButton locationText={locationText} onDetect={handleDetectLocation} />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4">
              <ul className="flex items-center gap-2">
                {NAV_LINKS.map(({ to, label, className }) => (
                  <span key={to} className={className}>
                    <NavLink to={to} label={label} isActive={isActive(to)} />
                  </span>
                ))}
                <li>
                  <CartButton totalCount={totalCount} />
                </li>
              </ul>

              {user ? (
                <ProfileDropdown
                  user={user}
                  profileRef={profileRef}
                  isProfileOpen={isProfileOpen}
                  setIsProfileOpen={setIsProfileOpen}
                  handleLogout={handleLogout}
                />
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-4 py-2 rounded-xl font-semibold transition shadow-sm active:scale-95 bg-orange-500 text-white hover:bg-orange-600"
                >
                  Login
                </button>
              )}
            </nav>

            {/* Mobile Cart + Hamburger */}
            <CartButton totalCount={totalCount} onClick={closeMenu} className="md:hidden" />
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <MobileMenu
            user={user}
            closeMenu={closeMenu}
            handleLoginClick={handleLoginClick}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
};

export default Header;