import React, { useState } from "react";
import "./App.css";
import { ChatRoom } from "./components/ChatRoom";
// import GameRoom from "./components/GameRoom";
const App = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (name === "") return alert("empty");
    setId(name);
  };
  return id !== "" ? (
    <>
      <div id="notify">Hello {id}</div>
      <ChatRoom name={id} />
    </>
  ) : (
    <div class='shadow' id="login-box">
      <div id="top-bar"></div>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Create username</label>
        <br />
        <input
          id="name"
          onChange={e => setName(e.target.value.trim())}
          required
          placeholder="please enter your username"
        />
        <br />
        <button className="osxbutton" type="submit">
          JOIN ROOM
        </button>
        <br />
      </form>
    </div>
  );
};

export { App };
