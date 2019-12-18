/* eslint-disable prefer-destructuring */
const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "birthdaydb",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/birthdays", (req, res) => {
  // res.status(200).send("You requested all the birthdays!!!")
  connection.query("SELECT * FROM Birthdays", (err, data) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(data);
    }
  });
});

app.delete("/birthdays/:birthdayID", (req, res) => {
  const birthdayID = req.params.birthdayID;
  connection.query("DELETE FROM Birthdays WHERE birthdayID = ?", [birthdayID], (err) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).send(`${birthdayID} has been deleted!`);
    }
  });
});


module.exports.birthdays = serverlessHttp(app);
