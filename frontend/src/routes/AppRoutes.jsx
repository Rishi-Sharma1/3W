import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Feed from "../pages/Feed";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<Signup />}
        />
        
        <Route
          path="/"
          element={<Login />}
        />

        

        <Route
          path="/feed"
          element={<Feed />}
        />
      </Routes>
    </BrowserRouter>
  );
}