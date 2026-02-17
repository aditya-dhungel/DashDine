import { Link } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const RestaurantGrid = ({ restaurants }) => (
  <div className="flex flex-wrap justify-center">
    {restaurants.map((restaurant, idx) => (
      <Link
        key={restaurant?.data?.id ?? idx}
        to={`/restaurants/${restaurant?.data?.id ?? idx}`}
      >
        {restaurant.data.promoted ? (
          <RestaurantCardPromoted resData={restaurant} />
        ) : (
          <RestaurantCard resData={restaurant} />
        )}
      </Link>
    ))}
  </div>
);

export default RestaurantGrid;