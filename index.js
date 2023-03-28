const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "This is my API"
  });
});

const db = require("./config/db.js")
db.connect((err) => {
  if (err) return console.log(err);
  console.log("success connect to mysql");
})

const { userRouters } = require("./routers")
app.use("/user", userRouters)

app.listen(process.env.PORT, () => {
  console.log(`server running at port: ${process.env.PORT}`);
});