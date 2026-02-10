import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // start with mockData normalized OR empty array to avoid mixing shapes
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // console.log("Body Rendered");
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 900); // 0.9 seconds delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.8654242&lng=77.886746&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      // console.log(json);

      // find restaurants array safely (Swiggy nestig can change)
      const rawRestaurants =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards?.find(
          (c) => c.card?.card?.id === "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      // normalize each item into the shape your compnents expect: { data: {...} }
      const normalized = rawRestaurants.map((item, idx) => {
        const info = item?.info ?? item?.data ?? item;

        const id = info?.id ?? info?.restaurantId ?? `no-id-${idx}`;
        const name = info?.name ?? "";
        const cloudinaryImageId =
          info?.cloudinaryImageId ?? info?.imageId ?? "";
        const avgRatingRaw =
          info?.avgRating ?? info?.avg_rating ?? info?.avgRatingString ?? "0";
        const avgRating = Number(avgRatingRaw) || 0;
        const cuisines = info?.cuisines ?? info?.variants ?? [];
        const costForTwo = info?.costForTwoMessage ?? info?.costForTwo ?? "";
        const deliveryTime =
          info?.sla?.deliveryTime ??
          info?.deliveryTime ??
          info?.minDeliveryTime ??
          "";

        return {
          data: {
            id,
            name,
            cloudinaryImageId,
            avgRating,
            cuisines,
            costForTwo,
            deliveryTime,
            // keep original info in case RestaurantCard needs deeper fields
            _raw: info,
          },
        };
      });

      setListOfRestaurants(normalized);
      setFilteredRestaurants(normalized);
    } catch (err) {
      console.error("fetchData error:", err);
      setListOfRestaurants([]); // safe fallback
    }
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return (
      <div className=" bg-gray-50 px-4 pt-10 flex justify-center items-center">
        <div className="inline-block bg-white border border-gray-200 rounded-2xl shadow-md px-6 py-5 text-center">
          <p className="text-lg font-semibold text-gray-900">You’re offline</p>
  
          <p className="mt-1 text-sm text-gray-600 max-w-[260px] mx-auto">
            Please connect to the internet to load restaurants.
          </p>
        </div>
      </div>
    );
  }
  

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="pb-6">
      {/* Filter Bar */}
      <div className="w-full flex justify-center px-4 mt-6">
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center gap-4">
          {/* Search bar */}
          <div className="w-full sm:flex-1 flex items-center bg-white border border-gray-200 rounded-full shadow-md px-4 py-2 transition focus-within:ring-2 focus-within:ring-amber-300">
            {/* <span className="text-gray-400 text-lg mr-2"></span> */}

            <input
              type="text"
              className="w-full bg-transparent outline-none text-[15px] placeholder-gray-400"
              placeholder="Find your favourite restaurant..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const filteredRestaurant = listOfRestaurants.filter((res) => {
                    const name = res?.data?.name || res?.data?._raw?.name || "";
                    return name
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  });

                  setFilteredRestaurants(filteredRestaurant);
                }
              }}
            />

            <button
              className="ml-3 px-4 py-2 rounded-full font-semibold text-white 
                        bg-linear-to-r from-amber-500 to-orange-500 shadow-sm 
                        hover:shadow-md hover:scale-[1.02] transition-all duration-300 
                        active:scale-[0.97] inline-flex items-center gap-2 whitespace-nowrap"
              onClick={() => {
                const filteredRestaurant = listOfRestaurants.filter((res) => {
                  const name = res?.data?.name || res?.data?._raw?.name || "";
                  return name.toLowerCase().includes(searchText.toLowerCase());
                });

                setFilteredRestaurants(filteredRestaurant);
              }}
            >
              <span>Search</span>
              <span>🔍</span>
            </button>
            
          </div>

         
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurants?.map((restaurant, idx) => (
          <Link
            key={restaurant?.data?.id ?? idx}
            to={`/restaurants/${restaurant?.data?.id ?? idx}`}
          >
            {/* if res is promoted add a promoted label to it  */}
            {restaurant.data.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

