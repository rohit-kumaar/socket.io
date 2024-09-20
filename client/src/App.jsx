import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io(`http://localhost:4000`);

  const [msg, setMsg] = useState({
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("msg", msg);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMsg((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("broadcast", (msg) => {
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main>
      <h1>Welcome to socket.io</h1>
      <form onClick={handleSubmit}>
        <div>
          Write a message :
          <input type="text" name="msg" onChange={handleChange} />
        </div>
        <input type="button" value="Send" />
      </form>
    </main>
  );
}
