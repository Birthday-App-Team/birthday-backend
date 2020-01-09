/* eslint-disable prefer-destructuring */
const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");

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
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(data);
    }
  });
});

app.delete("/birthdays/:birthdayID", (req, res) => {
  const birthdayID = req.params.birthdayID;
  connection.query(
    "DELETE FROM Birthdays WHERE birthdayID = ?",
    [birthdayID],
    (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).send(`${birthdayID} has been deleted!`);
      }
    },
  );
});

app.post("/birthdays", (req, res) => {
  const birthday = req.body;
  // install and require moment
  // find out if it is this person's birthday today
  // if so, make an axios request to the sendBirthday message function
  const q = "INSERT INTO Birthdays SET ?";
  connection.query(q, birthday, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (moment(birthday).format("MM-DD") === moment().format("MM-DD")) {
        axios
          .post(
            "https://46m3x72wmb.execute-api.eu-west-2.amazonaws.com/dev/send",
            {
              recipient_name: birthday.name,
              recipient_phone_number: birthday.phone_number,
              message: "What a lovely morning!:D :D",
              from_phone_number: "+447506190696"
            }
          )
          .then(() => {
            birthday.birthdayID = data.insertID;
            res.status(201).json(birthday);
          })
          .catch(err => {
            console.log("Error sending birthday message", err);
            birthday.birthdayID = data.insertID;
            res.status(201).send(birthday);
          });
      } else {
        birthday.birthdayID = data.insertID;
        res.status(201).json(birthday);
      }
    }
  });
});

app.put("/birthdays/:birthdayID", (req, res) => {
  const birthdayID = req.params.birthdayID;
  const birthday = req.body;
  const q =
    "UPDATE Birthdays SET name = ?, gender = ?, date_of_birth = ?, interests = ?, phone_number = ? WHERE birthdayID = ?";
  connection.query(
    q,
    [
      birthday.name,
      birthday.gender,
      birthday.date_of_birth,
      birthday.interests,
      birthday.phone_number,
      birthdayID
    ],
    (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res
          .status(205)
          .send(
            `You updated a birthday for ${
              birthday.name
            } with the following data: ${JSON.stringify(birthday)}`
          );
      }
    },
  );
});

module.exports.birthdays = serverlessHttp(app);
