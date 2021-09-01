const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "ENTER URL OF DATABASE",
    user: "ENTER POSTGRES USERNAME",
    password: "ENTER DATABASE PASSWORD",
    database: "ENTER DATABASE NAME",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/login", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));
app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
