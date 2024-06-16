import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import PublicRoute from "./components/PublicRoute";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  const routes = createRoutesFromChildren(
    <>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router}>
      <Toaster />
    </RouterProvider>
  );
}

export default App;
