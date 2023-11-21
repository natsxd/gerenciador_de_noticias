const {Schema, model} = require('mongoose');

const newsSchema = new Schema({
  title: String,
  url: String,
  date: { type: Date, default: Date.now }
})
const newsModel = model('News', newsSchema);

module.exports = newsModel;
