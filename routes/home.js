const express = require("express");
const fs = require("fs");
const LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./login");

const handler = express.Router();

handler.get("/", (req, res) => {
  const data = fs.readFileSync("message.txt", "utf8");

  res.send(`
    <div>
      <div>${data}</div>
      <form action='/' method='POST'>
        <input type='text' id='message' name='message'/>
        <button type='submit'>Send</button>
      </form>
    </div>
  `);
});

handler.post("/", (req, res) => {
  const { message } = req.body;
  const username = localStorage.getItem("username");
  const data = fs.readFileSync("message.txt", "utf8");

  const messageFormat = data + `${username}:-${message} `;

  fs.writeFile("message.txt", messageFormat, (error) => {
    if (error) throw new Error(error);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  });
});

module.exports = handler;
