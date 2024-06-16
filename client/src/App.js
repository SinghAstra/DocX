import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";
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
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  const routes = createRoutesFromChildren(
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/recovery"
        element={
          <PublicRoute>
            <Recovery />
          </PublicRoute>
        }
      />
      <Route
        path="/reset"
        element={
          <PublicRoute>
            <Reset />
          </PublicRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
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
