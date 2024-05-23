import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Analytics } from "@vercel/analytics/react";

import "./index.css";
import { UserHome } from "./pages/UserHome.jsx";
import { Home } from "./pages/Home.jsx";
import { Browser } from "./pages/Browser.jsx";
import { Builder } from "./pages/Builder.jsx";
import { useLocalStorage } from "@uidotdev/usehooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Browser />,
  },
  {
    path: "/profile",
    element: <UserHome />,
  },
  {
    path: "/builder",
    element: <Builder />,
  },
]);

const App = () => {
  const [user, setUser] = useLocalStorage(
    "user",
    localStorage.getItem("user") ? localStorage.getItem("user") : null,
  );
  const [profile, setProfile] = useLocalStorage(
    "profile",
    localStorage.getItem("profile") ? localStorage.getItem("profile") : null,
  );
  const [loggedIn, setLoggedIn] = useLocalStorage(
    "loggedIn",
    localStorage.getItem("loggedIn") ? localStorage.getItem("loggedIn") : false,
  );

  return (
    <div className="flex h-full w-full flex-col justify-center p-0 align-middle">
      <RouterProvider router={router} />
      <Analytics />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="952724998893-fi1qnc0vkgtlht7fpabcdooliil0ua27.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </GoogleOAuthProvider>,
);
