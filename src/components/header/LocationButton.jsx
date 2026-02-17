const LocationButton = ({ locationText, onDetect }) => (
  <button
    onClick={onDetect}
    title="Click to detect your location"
    className="flex items-center justify-between gap-2 px-4 py-2 rounded-full
                 border border-gray-200 bg-white shadow-sm hover:shadow-md
                 hover:bg-gray-50 transition-all duration-200
                 max-w-[130px] md:max-w-[300px]"
  >
    <div className="flex items-center gap-2 min-w-0">
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
      <span className="text-xs md:text-sm font-medium text-gray-700 truncate">
        {locationText}
      </span>
    </div>
    <span className="text-gray-400 text-xs shrink-0 hidden md:inline">▾</span>
  </button>
);

export default LocationButton;
