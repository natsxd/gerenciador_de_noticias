const { news } = require('./setup.json');
const News = require('./models/news');

async function setupDB() {
  for (let { title, url, date } of news) {
    if (!await News.findOne({ url })) {
      const n = new News({ title, url, date });
      await n.save();
    }
  }
}

module.exports = setupDB;
