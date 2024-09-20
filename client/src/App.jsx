import React from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io(`http://localhost:4000`);

  return <div>Vite app is working</div>;
}
