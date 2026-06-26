import { useState, useEffect } from "react";

const SWIGGY_URL =
  "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.8654242&lng=77.886746&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const normalizeRestaurants = (rawRestaurants) =>
  rawRestaurants.map((item, idx) => {
    const info = item?.info ?? item?.data ?? item;
    const avgRatingRaw =
      info?.avgRating ?? info?.avg_rating ?? info?.avgRatingString ?? "0";

    return {
      data: {
        id: info?.id ?? info?.restaurantId ?? `no-id-${idx}`,
        name: info?.name ?? "",
        cloudinaryImageId: info?.cloudinaryImageId ?? info?.imageId ?? "",
        avgRating: Number(avgRatingRaw) || 0,
        cuisines: info?.cuisines ?? info?.variants ?? [],
        costForTwo: info?.costForTwoMessage ?? info?.costForTwo ?? "",
        deliveryTime:
          info?.sla?.deliveryTime ??
          info?.deliveryTime ??
          info?.minDeliveryTime ??
          "",
        promoted: info?.promoted ?? false,
        _raw: info,
      },
    };
  });

const extractRestaurants = (json) =>
  json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
    ?.restaurants ||
  json?.data?.cards?.find((c) => c.card?.card?.id === "restaurant_grid_listing")
    ?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
  [];

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timer = setTimeout(fetchData, 900);
    return () => clearTimeout(timer);
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(SWIGGY_URL);
  //     const json = await response.json();
  //     const normalized = normalizeRestaurants(extractRestaurants(json));
  //     setRestaurants(normalized);
  //     setFilteredRestaurants(normalized);
  //   } catch (err) {
  //     console.error("fetchData error:", err);
  //     setRestaurants([]);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_URL);

      console.log("Status:", response.status);

      const json = await response.json();

      console.log("Full JSON:", json);

      const extracted = extractRestaurants(json);
      console.log("Extracted:", extracted);

      const normalized = normalizeRestaurants(extracted);
      console.log("Normalized:", normalized);

      setRestaurants(normalized);
      setFilteredRestaurants(normalized);
    } catch (err) {
      console.error("fetchData error:", err);
      setRestaurants([]);
    }
  };

  const handleSearch = () => {
    const filtered = restaurants.filter((res) => {
      const name = res?.data?.name || res?.data?._raw?.name || "";
      return name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredRestaurants(filtered);
  };

  return {
    restaurants,
    filteredRestaurants,
    searchText,
    setSearchText,
    handleSearch,
  };
};

export default useRestaurants;
