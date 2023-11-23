const mongoose = require('mongoose');

module.exports = {
  connect: () => (
    mongoose.connect(`${process.env.CONN_STR}/newsManager`)
  ),
  disconnect: () => (
    mongoose.disconnect()
  )
};