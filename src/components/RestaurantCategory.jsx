import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  // const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    // setShowItems(!showItems);
    console.log("Clicked");
    setShowIndex();
  };

  //   console.log(data);

  return (
    <div>
      {/*accordion header */}
      
      {/* <div className="w-6/12 mx-auto my-6 bg-gray-100 shadow-lg p-4"> */}
      <div className="w-full max-w-3xl mx-auto my-6 bg-white shadow-md rounded-xl p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span className="hover:scale-110 ">↓</span>
        </div>

        {/* Accordion body */}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
