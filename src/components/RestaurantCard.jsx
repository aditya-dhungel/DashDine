import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData?.data || {};

  return (
    <div className="shadow-md ml-3 w-[80vw] sm:w-[250px] h-[430px] p-1.5 m-1.5 rounded-lg font-light font-sans cursor-pointer hover:bg-linear-to-b hover:from-orange-100 hover:to-white transition-all duration-300 hover:scale-95 transition duration-250 ease-in-out ">
      <img
        className="rounded-lg h-[180px] w-full object-cover"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />

      <div className="res-name font-semibold m-1 text-xl">
        <h3>{name}</h3>
      </div>

      <h4 className="m-1.5">{cuisines.join(", ")}</h4>
      <h4 className="m-1.5 text-green-600">{avgRating} stars</h4>
      <h4 className="m-1.5">{costForTwo}</h4>
      <h4 className="m-1.5">Delivery in {deliveryTime} minutes</h4>
    </div>
  );
};

// higher order component -> promoted label
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return () => {
      <div>
        <label htmlFor="">Promoted</label>
        <RestaurantCard {...props} />
      </div>;
    };
  };
};

export default RestaurantCard;
