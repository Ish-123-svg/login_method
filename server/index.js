const express = require("express");

const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);
const db = require("../database/index.js");


app.use(express.static("./client/public"));

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/users", (req, res) => {
  db.query("select * from users", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/activate", (req, res) => {
  // client.messages
  //   .create({
  //     body: "Gareth is testing SMS capabilities",
  //     from: "+12562693589",
  //     to: "+14784612233",
  //   })
  //   .then((message) => {
  //     res.send(message.sid);
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
  res.send("received");
});

app.listen(port, () => {
  console.log("node is listening");
});
