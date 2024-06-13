import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import PublicRoute from "./components/PublicRoute";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("isAuthenticated", isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: <PublicRoute component={Register} />,
    },
    {
      path: "/recovery",
      element: <PublicRoute component={Recovery} />,
    },
    {
      path: "/profile",
      element: <PrivateRoute component={Profile} />,
    },
    {
      path: "/reset",
      element: <PublicRoute component={Reset} />,
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
