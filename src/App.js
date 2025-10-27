import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  // return <RouterProvider router={root} />;

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={root} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
