import {BrowserRouter, Route, Routes} from 'react-router-dom'
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
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotLoggedInTemplate />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<NotLoggedInTemplate />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<NotLoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route path="/search" element={<Search />} />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route path="/counsil" element={<Counsil />} />
        </Route>
        <Route element={<LoggedInTemplate />}>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
