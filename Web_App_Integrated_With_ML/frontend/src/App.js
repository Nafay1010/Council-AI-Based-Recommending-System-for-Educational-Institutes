import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Normal.css";
import Home from "./Dashboard/Home";
import Counsil from "./Dashboard/Counsil";
import Error404 from "./Error404";
import NotLoggedInTemplate from "./Templates/NotLoggedInTemplate";
import LoggedInTemplate from "./Templates/LoggedInTemplate";
import Signup from "./Login&Register/Signup";
import Login from "./Login&Register/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import SearchList from "./Dashboard/SearchList";
import Recommendation from "./Dashboard/Recommendation";
function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route id="/" element={<NotLoggedInTemplate />}>
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
        </Route>
        <Route id="signup" element={<NotLoggedInTemplate />}>
          <Route
            exact
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/login" />}
          />
        </Route>
        <Route id="login" element={<NotLoggedInTemplate />}>
          <Route
            exact
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
        </Route>
        <Route id="!Error404" element={<NotLoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route id="home" element={<LoggedInTemplate />}>
          <Route
            exact
            path="/home"
            element={user ? <Home key={user._id} /> : <Navigate to="/login" />}
          />
        </Route>
        <Route id="search" element={<LoggedInTemplate />}>
          <Route
            exact
            path="/Search"
            element={
              user ? <SearchList key={user._id} /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route id="counsil" element={<LoggedInTemplate />}>
          <Route
            exact
            path="/counsil"
            element={user ? <Counsil /> : <Navigate to="/login" />}
          />
        </Route>
        <Route id="recommendation" element={<LoggedInTemplate />}>
          <Route
            exact
            path="/recommendation"
            element={user ? <Recommendation /> : <Navigate to="/login" />}
          />
        </Route>
        <Route id="Error404" element={<LoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
