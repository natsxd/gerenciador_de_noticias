const express = require('express');
const News = require('../db/models/news');
const ErrorFactory = require("../factory/errorFactory");
const router = express.Router();

router.get('/', async function(req, res) {
  try {
    const allNews = await News.find();
    res.status(200).send(allNews);
  } catch({ message, stackTrace }) {
    res.status(500).send(ErrorFactory.getError(message));
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
      res.status(400).send(ErrorFactory.getError('Invalid input'));
      return;
    }

    if (id) {
      const found = await News.findById(id);
      if (!found) {
        res.status(400).send(ErrorFactory.getError('News not found for given id'));
        return;
      }

      found.url = url;
      found.title = title;
      await found.save();
      console.log('Successfully updated news with id: ', id);
      res.status(204).send();
    }

    if (await News.findOne({ url })) {
      res.status(409).send(ErrorFactory.getError('Conflict: news with same url already exists'));
    } else {
      const n = new News({ title, url });
      await n.save();
      res.status(201).send();
    }
  } catch(e) {
    console.error(e);
    res.status(500).send(ErrorFactory.getError(e.message));
  }
});

router.delete('/', async function(req, res) {
  const {
    id
  } = req.body;

  try {
    const found = await News.findByIdAndDelete(id);
    if (!found) {
      res.status(400).send(ErrorFactory.getError('News not found for given id'));
      return;
    }
    res.status(204).send();
  } catch({ message, stackTrace }) {
    res.status(500).send(ErrorFactory.getError(message));
  }
});

module.exports = router;
