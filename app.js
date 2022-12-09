const express = require("express");
// const cors =require ("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mydb");

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // айди из постмана
  };
  next();
});

app.use("/", userRouter);
app.use("/", cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
