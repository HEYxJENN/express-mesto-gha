const express = require("express");
// const cors =require ("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "6393413504d3d66f8f3477c6", // айди из постмана
  };
  next();
});

app.use("/", userRouter);
app.use("/", cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
