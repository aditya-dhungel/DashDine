import { useEffect, useState } from "react";
import menu204036 from "../data/menu_204036.json";

// custom hook
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]); // will re-run if resId changes (good for future)

  const fetchData = async () => {
    // In the course vid 9, he uses: fetch(MENU_API + resId)
    // but I don't have an API right now, so I am just loading a local JSON file instead.

    // right now we ignore resId and always use menu204036
    const data = menu204036?.data;
    setResInfo(data);

  };

  return resInfo;
};

export default useRestaurantMenu;
