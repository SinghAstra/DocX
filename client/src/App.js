import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: <ProtectedRoute component={Register} />,
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
      path: "*",
      element: <PageNotFound></PageNotFound>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
