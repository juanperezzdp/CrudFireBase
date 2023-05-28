import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Edit from "../components/Edit";
import Create from "../components/Create";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);
