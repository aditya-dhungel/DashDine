import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/";
const FALLBACK_IMAGE = "https://via.placeholder.com/100?text=No+Image";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [menuItems, setMenuItems] = useState([]);

  //accordion functionality
  const [showIndex, setShowIndex] = useState(null);

  useEffect(() => {
    if (!resInfo) return;

    // console.log("Cards Array:", resInfo?.cards);

    const regularCards = resInfo?.cards?.find(
      (c) => c.groupedCard?.cardGroupMap?.REGULAR
    )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    const items = [];
    regularCards?.forEach((card) => {
      const itemCards = card?.card?.card?.itemCards;
      if (itemCards) {
        itemCards.forEach((item) => items.push(item.card.info));
      }
    });

    setMenuItems(items);
  }, [resInfo]);

  if (!resInfo) return <Shimmer />;

  const {
    name = "Restaurant",
    cuisines = [],
    costForTwoMessage = "",
  } = resInfo?.cards?.[2]?.card?.card?.info ?? {};

  // console.log(card?.card?.card?.itemCards);
  // console.log("Cards Array:", resInfo?.cards);
  // console.log("categories", categories);

  const categories =
    resInfo?.cards
      ?.find((c) => c.groupedCard?.cardGroupMap?.REGULAR)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) || [];

  return (
    <div className="menu text-center px-4 sm:px-6">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <h2 className="m-3">Menu Items</h2>

      {/* categories accordion */}
      <div>
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title || index}
            data={category?.card?.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
