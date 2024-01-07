const express = require("express");
const bodyParser = require("body-parser");
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(loginRoutes);
app.use(homeRoutes);

app.use((req, res) => {
  res.send(`<div>Pages not found</div>`);
});

app.listen(3000);
