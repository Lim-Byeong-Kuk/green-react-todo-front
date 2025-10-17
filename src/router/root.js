import { lazy, Suspense } from "react";
import AboutPage from "../pages/AboutPage";
import todoRouter from "./todoRouter";
import ScoreIndexPage from "../pages/scores/ScoreIndexPage";
import scoreRouter from "./scoreRouter";
import ProductComponent from "../product/ProductComponent";
import productRouter from "./productRouter";
import ListPage from "../pages/products/ListPage";
import addressRouter from "./addressRouter";
import memberRouter from "./memberRouter";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/MainPage"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"));
const AddressIndex = lazy(() => import("../pages/address/IndexPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: "todo",
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
    children: todoRouter(),
  },
  {
    path: "score",
    element: (
      <Suspense fallback={Loading}>
        <ScoreIndexPage />
      </Suspense>
    ),
    children: scoreRouter(),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductsIndex />
      </Suspense>
    ),
    children: productRouter(),
  },
  {
    path: "address",
    element: (
      <Suspense fallback={Loading}>
        <AddressIndex />
      </Suspense>
    ),
    children: addressRouter(),
  },
  {
    path: "member",
    children: memberRouter(),
  },
]);

export default root;
