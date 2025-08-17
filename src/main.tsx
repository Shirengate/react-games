import { createRoot } from "react-dom/client";
import "./assets/index.scss";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout/index.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path:'*',
        element:<ErrorPage/>
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
