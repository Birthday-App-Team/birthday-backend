const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/birthdays", (req, res) => {
  res.status(200).send("You requested all the birthdays!!!")
})

module.exports.birthdays = serverlessHttp(app);