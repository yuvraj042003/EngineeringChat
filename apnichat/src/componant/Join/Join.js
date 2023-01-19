import React, { useState } from "react";
import "./Join.css";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";

let user;
const Join = () => {
  const sendUser = () => {
    user = document.getElementById("JoinInput").value;
    document.getElementById("JoinInput").value = "";
  };
  const [name, setname] = useState("");
   
  return (
    <>
      <div className="JoinPage">
        <div className="JoinContainer">
          <img src={logo} alt="logo" />
          <h1>Engineer's Chatting App</h1>
          <input
            type="text"
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter Your Name"
            id="JoinInput"
          />
          <Link
            onClick={(event) => (!name ? event.preventDefault() : null)}
            to="/chat"
          >
            <button onClick={sendUser} className="joinbtn">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Join;
export { user };
