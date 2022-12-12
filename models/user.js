const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength:2,
    default:'Жак-Ив Кусто'
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default:'Исследователь'
  },
  avatar: {
    type: String,
    required: true,
    default:'https://www.rgo.ru/sites/default/files/styles/head_image_article/public/1034295-e1477344635669-1.jpg?itok=4U4Dw9en'
  },
});

module.exports = mongoose.model("user", userSchema);
