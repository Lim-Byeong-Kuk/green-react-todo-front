import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>;
const AddressList = lazy(() => import("../pages/address/ListPage"));
const AddressAdd = lazy(() => import("../pages/address/AddPage"));

const addressRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <AddressList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/address/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <AddressAdd />
        </Suspense>
      ),
    },
  ];
};

export default addressRouter;
