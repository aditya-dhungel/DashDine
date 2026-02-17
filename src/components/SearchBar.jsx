const SearchBar = ({ searchText, setSearchText, onSearch }) => (
  <div className="w-full flex justify-center px-4 mt-8 mb-2">
    <div className="w-full max-w-2xl">
      <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md px-3 py-2 gap-2 transition-all duration-200 focus-within:shadow-lg focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100">
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-orange-400 shrink-0 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35"
          />
        </svg>

        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-[15px] text-gray-800 placeholder-gray-400 py-1"
          placeholder="Search for restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />

        {/* Clear button*/}
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="text-gray-400 hover:text-gray-600 transition text-lg leading-none px-1"
            aria-label="Clear"
          >
            ✕
          </button>
        )}

        <button
          onClick={onSearch}
          className="px-5 py-2 rounded-full font-semibold text-white text-sm
                     bg-linear-to-r from-amber-500 to-orange-500
                     shadow-sm hover:shadow-md hover:from-amber-600 hover:to-orange-600
                     active:scale-95 transition-all duration-200 whitespace-nowrap shrink-0"
        >
          Search
        </button>
      </div>
    </div>
  </div>
);

export default SearchBar;
