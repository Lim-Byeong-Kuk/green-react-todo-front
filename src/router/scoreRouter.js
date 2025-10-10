import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>;
const ScoreList = lazy(() => import("../pages/scores/ScoreListPage"));
const ScoreRead = lazy(() => import("../pages/scores/ScoreReadPage"));

const scoreRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ScoreList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "read/:sno",
      element: (
        <Suspense fallback={Loading}>
          <ScoreRead />
        </Suspense>
      ),
    },
  ];
};

export default scoreRouter;
