import ProfileAvatar from "./ProfileAvatar";

const ProfileDropdown = ({ user, profileRef, isProfileOpen, setIsProfileOpen, handleLogout }) => (
  <div className="relative" ref={profileRef}>
    <button
      onClick={() => setIsProfileOpen((prev) => !prev)}
      title="Account"
      className="relative group"
    >
      <ProfileAvatar user={user} />
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition blur-md bg-orange-200 -z-10" />
    </button>

    {isProfileOpen && (
      <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-slideUp">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <ProfileAvatar user={user} size="w-10 h-10" />
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user?.displayName || "User"}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email || "No email"}</p>
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
);

export default ProfileDropdown;