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

  // console.log("categories", categories);

  // return (
  //   <div className="menu text-center">
  //     <h1 className="font-bold my-6 text-2xl">{name}</h1>
  //     <h2 className="m-3">Menu Items</h2>

  //     <ul className="menu-list">
  //       {menuItems.map((item, idx) => {
  //         const price = ((item.price ?? item.defaultPrice) / 100)?.toFixed(0);
  //         // const img = item.imageId
  //         //   ? `${IMG_CDN_URL}w_200,h_200/${item.imageId}`
  //         //   : FALLBACK_IMAGE;

  //         return (
  //           <li key={`${item.id || "no-id"}-${idx}`} className="menu-item">
  //             {/* <div className="menu-info">
  //               <h4 className="m-2 font-serif">{item.name}</h4>
  //               {item.description && (
  //                 <p className="menu-desc font-serif">{item.description}</p>
  //               )}
  //               <p className="menu-price text-green-600">₹{price}</p>
  //             </div> */}
  //             {/* <img src={img} alt={item.name} className="menu-img" /> */}

  //             {/* categories accordion */}
  //             {categories.map((category, index) => (
  //               //controlled component
  //               <RestaurantCategory
  //                 key={category?.card?.card.title}
  //                 data={category?.card?.card}
  //                 showItems={index === showIndex ? true : false}
  //                 //collapsing one accordion upon clicking another
  //                 setShowIndex={() => setShowIndex(index)}
  //               />
  //             ))}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
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


// import { useEffect, useState } from "react";
// import Shimmer from "./Shimmer";
// import Header from "./Header";
// import menu204036 from "../data/menu_204036.json";

// const RestaurantMenu = () => {
//   const [resInfo, setResInfo] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     const data = menu204036?.data;
//     setResInfo(data);

//     // Extract menu items
//     const regularCards = data?.cards?.find(
//       (c) => c.groupedCard?.cardGroupMap?.REGULAR
//     )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

//     const items = [];

//     regularCards?.forEach((card) => {
//       const itemCards = card?.card?.card?.itemCards;
//       if (itemCards) {
//         itemCards.forEach((item) => {
//           items.push(item.card.info);
//         });
//       }
//     });

//     setMenuItems(items);
//   }, []);

//   if (!resInfo) return <Shimmer />;

//   const {
//     name = "Restaurant",
//     cuisines = [],
//     costForTwoMessage = "",
//   } = resInfo?.cards?.[2]?.card?.card?.info ?? {};

//   return (
//     <div className="menu">
//       <h1>{name}</h1>
//       <h3>{cuisines.join(", ")}</h3>
//       <h3>{costForTwoMessage}</h3>

//       <h2>Menu Items</h2>

//       {/* <ul>
//         {menuItems.map((item) => (
//           <li key={item.id}>
//             {item.name} — ₹{(item.price ?? item.defaultPrice) / 100}
//           </li>
//         ))}
//       </ul> */}
//       <ul>
//         {menuItems.map((item, idx) => (
//           <li key={`${item.id || "no-id"}-${idx}`}>
//             {item.name} — ₹
//             {((item.price ?? item.defaultPrice) / 100).toFixed(0)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantMenu;

//menu api
// https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.8654242&lng=77.886746&restaurantId=204036&catalog_qa=undefined&submitAction=ENTER

//normal api:
// https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.8654242&lng=77.886746&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
