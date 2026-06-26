import Shimmer from "./Shimmer";
import SearchBar from "./SearchBar";
import RestaurantGrid from "./RestaurantGrid";
import useRestaurants from "../utils/useRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";

const OfflineBanner = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center items-center">
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-8 py-6 text-center max-w-sm mx-4">
      <span className="text-4xl">📡</span>
      <p className="mt-3 text-lg font-semibold text-gray-900">You're offline</p>
      <p className="mt-1 text-sm text-gray-500">
        Please connect to the internet to load restaurants.
      </p>
    </div>
  </div>
);

const Body = () => {
  const {
    restaurants,
    filteredRestaurants,
    searchText,
    setSearchText,
    handleSearch,
  } = useRestaurants();

  console.log("Restaurants:", restaurants);
  console.log("Filtered:", filteredRestaurants);
  
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) return <OfflineBanner />;
  // if (restaurants.length === 0) return <Shimmer />;

  return (
    <div className="pb-6">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={handleSearch}
      />
      <RestaurantGrid restaurants={filteredRestaurants} />
    </div>
  );
};

export default Body;
