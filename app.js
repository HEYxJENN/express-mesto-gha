const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb", {
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63973e5584fd4a08788a59c7"
    // айди из постмана
  };
  next();
});

app.use("/", userRouter);
app.use("/", cardsRouter);
app.use("/*", (req,res) => {res.status(404).json({message:"Данный ресурс не найден"})})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
