const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
});
module.exports = mongoose.model('Card', cardSchema);
