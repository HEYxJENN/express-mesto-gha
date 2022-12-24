const mongoose = require('mongoose');
const Users = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Users,
  }],
  likes: [{
    type: Object,
    required: true,
    default: [],
    ref: Users,
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
