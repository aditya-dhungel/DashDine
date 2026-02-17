import { Link } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/grocery", label: "Grocery" },
];

const MobileMenu = ({ user, closeMenu, handleLoginClick, handleLogout }) => (
  <div className="md:hidden pb-4">
    <div className="mt-2 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col items-center text-center">
        {user && (
          <div className="w-full px-4 py-4 border-b border-gray-100 flex items-center gap-3">
            <ProfileAvatar user={user} size="w-12 h-12" />
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

        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="w-full px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
            onClick={closeMenu}
          >
            {label}
          </Link>
        ))}

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
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </div>
);

export default MobileMenu;
