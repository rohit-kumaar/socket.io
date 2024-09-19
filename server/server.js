import express from "express";

const server = express();
const port = 4000;

server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.listen(port, () => {
  console.log(`Port is working in port : http://localhost:${port}/`);
});
