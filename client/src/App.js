import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Username from "./components/Username";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Profile></Profile>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "/recovery",
      element: <Recovery></Recovery>,
    },
    {
      path: "/profile",
      element: <Profile></Profile>,
    },
    {
      path: "/reset",
      element: <Reset></Reset>,
    },
    {
      path: "/password",
      element: <Password></Password>,
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
