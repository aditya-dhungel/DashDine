const SearchBar = ({ searchText, setSearchText, onSearch }) => (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:flex-1 flex items-center bg-white border border-gray-200 rounded-full shadow-md px-4 py-2 transition focus-within:ring-2 focus-within:ring-amber-300">
          <input
            type="text"
            className="w-full bg-transparent outline-none text-[15px] placeholder-gray-400"
            placeholder="Find your favourite restaurant..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <button
            className="ml-3 px-4 py-2 rounded-full font-semibold text-white 
                       bg-linear-to-r from-amber-500 to-orange-500 shadow-sm 
                       hover:shadow-md hover:scale-[1.02] transition-all duration-300 
                       active:scale-[0.97] inline-flex items-center gap-2 whitespace-nowrap"
            onClick={onSearch}
          >
            <span>Search</span>
            <span>🔍</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  export default SearchBar;