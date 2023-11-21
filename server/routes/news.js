const express = require('express');
const News = require('../db/models/news');
const router = express.Router();

router.get('/', async function(req, res) {
  try {
    const allNews = await News.find();
    res.status(200).send(allNews);
  } catch({ message, stackTrace }) {
    console.error(stackTrace);
    res.status(500).send({
      status: 'error',
      message
    });
  }
});

router.put('/', async function(req, res) {
  const {
    id,
    title,
    url
  } = req.body;

  try {
    if (!url) {
      res.status(400).send({
        status: 'error',
        message: 'Invalid input'
      });
      return;
    }

    if (id) {
      const found = await News.findById(id);
      if (!found) {
        res.status(400).send({
          status: 'error',
          message: 'News not found for given id'
        });
        return;
      }

      found.url = url;
      found.title = title;
      await found.save();
      console.log('Successfully updated news with id: ', id);
      res.status(204).send();
    }

    if (await News.findOne({ url })) {
      res.status(409).send({
        status: 'error',
        message: 'Conflict: news with same url already exists'
      });
    } else {
      const n = new News({ title, url });
      await n.save();
      res.status(201).send();
    }
  } catch({ message, stackTrace }) {
    console.error(stackTrace);
    res.status(500).send({
      status: 'error',
      message
    });
  }
});

router.delete('/', async function(req, res) {
  const {
    id
  } = req.body;

  try {
    const found = await News.findByIdAndDelete(id);
    if (!found) {
      res.status(400).send({
        status: 'error',
        message: 'News not found for given id'
      });
      return;
    }
    res.status(204).send();
  } catch({ message, stackTrace }) {
    console.error(stackTrace);
    res.status(500).send({
      status: 'error',
      message
    });
  }
});

module.exports = router;
