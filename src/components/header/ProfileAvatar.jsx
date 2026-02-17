const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=111827&color=ffffff";

const ProfileAvatar = ({ user, size = "w-11 h-11" }) => (
  <div
    className={`${size} rounded-full bg-linear-to-tr from-orange-500 via-orange-400 to-yellow-400 p-0.5 shadow-sm group-hover:shadow-md transition`}
  >
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
);

export default ProfileAvatar;
