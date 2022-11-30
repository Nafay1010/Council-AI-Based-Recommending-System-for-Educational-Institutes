import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './Dashboard/Home';
import Search  from './Dashboard/Search';
import Counsil from './Dashboard/Counsil'
import Error404 from './Error404'
import NotLoggedInTemplate from './Templates/NotLoggedInTemplate';
import LoggedInTemplate from './Templates/LoggedInTemplate';
import Signup from './Login&Register/Signup'
import Login from './Login&Register/Login'
import { useAuthContext } from './hooks/useAuthContext';
function App() {

  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route id="/" element={<NotLoggedInTemplate />}>
        <Route
        path='/'
        element={!user ? <Login /> : <Navigate to="/home"/>}
        />
        </Route>
        <Route id="signup" element={<NotLoggedInTemplate />}>
          <Route 
          path="/signup" 
          element={!user ? <Signup /> : <Navigate to="/login"/>} 
          />
        </Route>
        <Route  id="login" element={<NotLoggedInTemplate />}>
          <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/home"/>}
          />
        </Route>
        <Route  id="!Error404" element={<NotLoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route  id="home" element={<LoggedInTemplate />}>
          <Route 
          path="/home" 
          element={user ? <Home key={user.id}/> : <Navigate to="/login"/>}
          />
        </Route>
        <Route id="search" element={<LoggedInTemplate />}>
          <Route 
          path="/search" 
          element={user ? <Search /> : <Navigate to="/login"/>} 
          />
        </Route>
        <Route  id="counsil" element={<LoggedInTemplate />}>
          <Route 
          path="/counsil" 
          element={user ? <Counsil /> : <Navigate to="/login"/>} 
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
