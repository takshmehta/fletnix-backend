const express = require('express');
const Show = require('../models/show');
const router = express.Router();
const mongoose  = require('mongoose');
const restrictForUnderage = require('../middlewares/restrictUnderageMiddleware');


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Show.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!movie) {
      return res.status(404).json({ message: 'Movie or TV show not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving movie or TV show' });
  }
})


router.get('/', restrictForUnderage, async (req, res) => {
  try {
    const { page = 1, type, search } = req.query;
    const query = {};

    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { cast: { $regex: search, $options: 'i' } }
      ];
    }

    const totalShows = await Show.countDocuments(query);
    const pageSize = 15; 
    const totalPages = Math.ceil(totalShows / pageSize); 

    const shows = await Show.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ shows, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
