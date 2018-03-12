const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Promise = require("bluebird");

const config = require("./config.json");
const users = require("./routes/users");

const app = express();
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
    }
    next();
  });

mongoose.Promise = Promise;
mongoose.connect(config.MONGODB_URL).then(console.log("Mongodb Connected"));

app.use("/api/users", users);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));