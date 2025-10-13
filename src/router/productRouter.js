import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>;
const ProductList = lazy(() => import("../pages/products/ListPage"));
const ProductsAdd = lazy(() => import("../pages/products/AddPage"));

const productRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ProductsAdd />
        </Suspense>
      ),
    },
  ];
};

export default productRouter;
