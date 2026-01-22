import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_200/";
const FALLBACK_IMAGE = "https://via.placeholder.com/200?text=No+Image";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="px-4 sm:px-6">
      {items.map((item) => {
        const info = item?.card?.info;

        const itemId = info?.id;
        const quantity = cartItems[itemId]?.quantity || 0;

        const price = ((info?.price ?? info?.defaultPrice) / 100)?.toFixed(0);

        const img = info?.imageId
          ? `${IMG_CDN_URL}${info.imageId}`
          : FALLBACK_IMAGE;

        return (
          <div
            key={itemId}
            className="flex justify-between py-8 border-b border-gray-200"
          >
            {/* LEFT SIDE TEXT */}
            <div className="w-8/12 text-left">
              <h3 className="font-bold text-xl text-gray-800">{info?.name}</h3>

              <p className="font-bold text-lg mt-2">₹{price}</p>

              {info?.description && (
                <p className="text-gray-500 mt-3 leading-7">
                  {info.description}
                </p>
              )}
            </div>

            {/* RIGHT SIDE IMAGE + BUTTON */}
            <div className="w-4/12 flex justify-end">
              <div className="relative w-40">
                <img
                  className="w-full h-[120px] object-cover rounded-2xl"
                  src={img}
                  alt={info?.name}
                />

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-5">
                  {quantity === 0 ? (
                    <button
                      className="bg-white text-green-600 font-bold px-10 py-2 rounded-xl shadow-md border border-gray-200"
                      onClick={() => dispatch(addItem(info))}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-between px-4 py-2 w-[130px]">
                      <button
                        className="text-green-600 font-bold text-xl"
                        onClick={() => dispatch(removeItem(itemId))}
                      >
                        -
                      </button>

                      <span className="text-green-600 font-bold text-lg">
                        {quantity}
                      </span>

                      <button
                        className="text-green-600 font-bold text-xl"
                        onClick={() => dispatch(addItem(info))}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;







// import { useDispatch } from "react-redux";
// import { CDN_URL } from "../utils/constants";
// import { addItem } from "../utils/cartSlice";

// const ItemList = ({ items }) => {
//   const dispatch = useDispatch();

//   const handleAddItem = (item) => {
//     //disptch action
//     dispatch(addItem(item));
//     // console.log("Clicked item:", item);
//   };

//   return (
//     <div>
//       {items.map((item) => (
//         <div
//           key={item.card.info.id}
//           className="p-2 m-2 border border-b border-gray-500 border-solid text-left justify-between"
//         >
//           <div className="">
//             <div className="py-2 flex flex-col">
//               <span className="font-medium">{item.card.info.name}</span>

//               <span>
//                 -₹
//                 {item.card.info.price
//                   ? item.card.info.price / 100
//                   : item.card.info.defaultPrice / 100}
//               </span>
//             </div>
//           </div>
//           <p className="text-xs text-gray-600">{item.card.info.description}</p>
//           <div className="w-3/12 p-4">
//             <div className="absolute">
//               <button
//                 className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg"
//                 onClick={() => handleAddItem(item)}
//               >
//                 Add +
//               </button>
//             </div>
//             <img
//               src={CDN_URL + item.card.info.imageId}
//               className="w-full h-20 object-cover rounded"
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ItemList;
