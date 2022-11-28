import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './Dashboard/Home';
import Search  from './Dashboard/Search';
import Counsil from './Dashboard/Counsil'
import Error404 from './Error404'
import NotLoggedInTemplate from './Templates/NotLoggedInTemplate';
import LoggedInTemplate from './Templates/LoggedInTemplate';
// import Signup1 from './Login&Register/Signup1'
import Signup from './Login&Register/Signup'
import Login from './Login&Register/Login'
import { useAuthContext } from './hooks/useAuthContext';
function App() {

  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotLoggedInTemplate />}>
        <Route
        path='/'
        element={<Login/>}
        />
        </Route>
        <Route element={<NotLoggedInTemplate />}>
          <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/login"/>} 
          />
        </Route>
        <Route element={<NotLoggedInTemplate />}>
          <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/home"/>}
          />
        </Route>
        <Route element={<NotLoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route 
          path="/home" 
          element={user ? <Home /> : <Navigate to="/login"/>}
          />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route 
          path="/search" 
          element={user ? <Search /> : <Navigate to="/login"/>} 
          />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route 
          path="/counsil" 
          element={user ? <Counsil /> : <Navigate to="/login"/>} 
          />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
