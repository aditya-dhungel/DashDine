import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import RestaurantCard from "./components/RestaurantCard";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

//import React, { lazy, Suspense } from "react";
// import Grocery from "./components/Grocery"; //if we have a grocery component and want to load only when clicking it we use lazy loading as below
const Grocery = lazy(() => import("./components/Grocery"));

//lazy loading about
const About = lazy(() => import("./components/About"));
const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {/* //Restaurant card */}
        {/* <RestaurantCard resData ={resList[0]}/>
        <RestaurantCard resData ={resList[1]}/>
        <RestaurantCard resData ={resList[2]}/>
        <RestaurantCard resData ={resList[6]}/> */}
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  ); 
};

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout/>,
//     errorElement: <Error/>
//   },
//   {
//     path: "/about",
//     element: <About/>
//   },
//   {
//     path: "/contact",
//     element: <Contact/>
//   }
// ]);

//children routes=> so that about/contact loads below header and not a complete new blank page
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      // grocery route with suspense
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppLayout />);

//now instead of root.render(<AppLayout />); we will use react router provider to load component

// root.render(<RouterProvider router={appRouter} />);
root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);

