import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Sidebar_Component from './Sidebar_Component';
import Search  from './Search';
import Counsil from './Counsil'
import Error404 from '../Error404'

function App() {
  
  return (
      <div className="App">
        <BrowserRouter>
           <Navbar/>
           <div className="content">
           <Sidebar_Component/>
            <Routes>
              <Route
              path="/"
              element={<Home/>}
              />
              <Route
                path="/search"
                element={<Search/>}
              />
              <Route
                path="counsil"
                element={<Counsil/>}
              />
              <Route
                path="*"
                element={<Error404/>}
              />
            </Routes>
            </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
