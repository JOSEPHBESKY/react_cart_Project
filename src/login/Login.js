import React from "react";
import Details from "./Details.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext } from "react";
import stateContext from "../Context";

function Login() {
  const { dispatch } = useContext(stateContext);
  const navi = useNavigate();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [error, seterror] = useState();

  function changeName(event) {
    setusername(event.target.value);
  }
  function changePassword(event) {
    setpassword(event.target.value);
  }

  //Submit function
  function submit(event) {
    event.preventDefault();
    Details.forEach((data) => {
      if (data.username == username && data.password == password) {
        navi("Home");
        localStorage.setItem("userLogin",true)
        dispatch({
          type: "login",
          payload: { isAuthenticated: true },
        });
      } else {
        seterror("Invalid username or password");
      }
    });
  }

  return (
    <div className="sec">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <label name="username" className="lable">
          Username:
        </label>
        <input
          type="text"
          name="text"
          placeholder="Enter your name"
          className="name"
          onChange={changeName}
        ></input>
        <br></br>
        <label name="password" className="lable">
          Password:
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="password"
          onChange={changePassword}
        ></input>
        <br></br>
        <button type="submit" className="submit">
          Submit
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default Login;
