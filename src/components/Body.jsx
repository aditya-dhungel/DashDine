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

      // find restaurants array safely (Swiggy nesting can change)
      const rawRestaurants =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards?.find(
          (c) => c.card?.card?.id === "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      // normalize each item into the shape your components expect: { data: {...} }
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
  if (onlineStatus === false)
    return (
      <h1 className="online-status">
        Looks like you are offline! Please check your internet❗️
      </h1>
    );

  //Shimmmer UI- conditional rendering(replaced by ternary operator below in return statement)
  // if(listOfRestaurants.length === 0){
  //   return <Shimmer />;
  // }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      {/* Premium Pill Filter Bar */}
      <div className="w-full flex justify-center px-4 mt-6">
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center gap-4">
          {/* Search Pill */}
          <div className="w-full sm:flex-1 flex items-center bg-white border border-gray-200 rounded-full shadow-md px-4 py-2 transition focus-within:ring-2 focus-within:ring-amber-300">
            <span className="text-gray-400 text-lg mr-2">🔍</span>

            <input
              type="text"
              className="w-full bg-transparent outline-none text-[15px] placeholder-gray-400"
              placeholder="Search restaurants..."
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
              className="ml-3 px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm hover:shadow-md hover:scale-[1.02] transition active:scale-[0.97]"
              onClick={() => {
                const filteredRestaurant = listOfRestaurants.filter((res) => {
                  const name = res?.data?.name || res?.data?._raw?.name || "";
                  return name.toLowerCase().includes(searchText.toLowerCase());
                });

                setFilteredRestaurants(filteredRestaurant);
              }}
            >
              Search
            </button>
          </div>

          {/* Top Rated Pill Button */}
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-amber-500 to-orange-500 border border-gray-200 shadow-md text-white hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] transition active:scale-[0.97]"
            onClick={() => {
              if (!Array.isArray(listOfRestaurants)) return;

              const filteredList = listOfRestaurants.filter((res) => {
                const rating = Number(res?.data?.avgRating) || 0;
                return rating > 4;
              });

              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      {/* <div className="res-container">
        {filteredRestaurants?.map((restaurant, idx) => (
          <RestaurantCard
            key={restaurant?.data?.id ?? idx}
            resData={restaurant}
          />
        ))}
      </div> */}
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

// import RestaurantCard from "./RestaurantCard";
// // import resList from "../utils/mockData";
// import { useState, useEffect } from "react";

// const Body = () => {
//   // local state variable - start with mock data
//   const [listOfRestaurants, setListOfRestaurants] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const data = await fetch(
//         "https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.8654242&lng=77.886746&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
//       );

//       const json = await data.json();
//       // console.log(json);

//       // safer access with optional chaining and fallback to mock data
//       const restaurants =
//         json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
//         ?.restaurants ?? resList;

//       setListOfRestaurants(restaurants);
//     } catch (err) {
//       console.error("fetchData error:", err);
//       // fallback to mock data on error
//       setListOfRestaurants(resList);
//     }
//   };

//   return (
//     <div className="body">
//       <div className="filter">
//         <button
//           className="filter-btn"
//           onClick={() => {
//             console.log("BTN clicked");
//             // rating filter
//             const filteredList = listOfRestaurants.filter(
//               (res) => Number(res?.data?.avgRating) > 4
//             );
//             console.log(filteredList);
//             setListOfRestaurants(filteredList);
//           }}
//         >
//           Top Rated Restaurants
//         </button>
//       </div>

//       <div className="res-container">
//         {/* //Restaurant card */}
//         {listOfRestaurants.map((restaurant) => (
//           <RestaurantCard
//             key={restaurant.info.id}
//             resData={restaurant}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Body;
