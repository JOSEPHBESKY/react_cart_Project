import React from "react";
import { BrowserRouter, Routes, Route, Link,Navigate } from "react-router-dom";
import Login from "./login/Login";
import Home from "./Home";
import "./App.css";
import Cart from "./Cart";
import stateContext from "./Context";
import { initialvalue, stateReducer } from "./Reducer";
import { useReducer } from "react";
import Favorite from "./Favorite";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';


function App() {
  const [state, dispatch] = useReducer(stateReducer, initialvalue);

//Logout function
const logout=()=>{
   localStorage.setItem("userLogin", false)
   dispatch({
    type: "userLogin",
    payload: {isAuthenticated:false}
  })
}

return (
    <div className="main">
      <stateContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
        {state?.isAuthenticated?(
          <>
          <ul className="navi">
            <li>
              <Link to="login" className="pages">Login</Link>
            </li>
            <li>
              <Link to="home" className="pages">Home</Link>
            </li>
            <li>
              <Link to="cart" className="pages"><AddShoppingCartIcon/></Link>
            </li>
            <li>
              <Link to="favorite" className="pages"><FavoriteBorderIcon/></Link>
            </li>
            <li>
              <span className="logout" onClick={()=>logout()}><ExitToAppRoundedIcon/></span>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="favorite" element={<Favorite />}></Route>
            <Route path="*" element={<Navigate to={'/'}></Navigate>}></Route>
          </Routes>
          </>
          ):(
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path='login' element={<Login/>}></Route> */}
            <Route path="*" element={<Navigate to={'/login'}></Navigate>}></Route>
          </Routes>
           )}
        </BrowserRouter>
      </stateContext.Provider>
    </div>
  );
}

export default App;
