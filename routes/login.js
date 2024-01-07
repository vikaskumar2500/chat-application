const express = require("express");
const LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./login");

const handler = express.Router();

handler.get("/login", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.send(` 
    <form action='/login' method='post'>
      <input type='text' id='username' name='username'/>
      <button type='submit'>Submit</button>
    </form>
  `);
});

handler.post("/login", (req, res) => {
  const { username } = req.body;
  localStorage.setItem("username", username);
  res.redirect("/");
});

module.exports = handler;
