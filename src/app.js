import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import Cart from "./components/Cart";
import CartSync from "./utils/CartSync";
import Login from "./components/Login";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { AuthProvider } from "./utils/AuthContext";

// lazy loading
const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  return (
    <div className="app">
      <CartSync />
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },

      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },

      { path: "/contact", element: <Contact /> },

      { path: "/restaurants/:resId", element: <RestaurantMenu /> },

      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },

      { path: "/cart", element: <Cart /> },

      { path: "/login", element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={appStore}>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </Provider>
);
