const express = require('express');
const mongoose = require('mongoose');
const { body, query, validationResult } = require('express-validator');
const Video = require('../models/Video');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['entertainment', 'education', 'gaming', 'music', 'sports', 'news', 'technology']),
  query('search').optional().trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const { category, search } = req.query;

    let query = { isPublic: true, isProcessed: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const videos = await Video.find(query)
      .populate('uploadedBy', 'username avatar')
      .sort({ views: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-comments');

    const total = await Video.countDocuments(query);

    res.json({
      videos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/trending', async (req, res) => {
  try {
    const videos = await Video.find({ isPublic: true, isProcessed: true })
      .populate('uploadedBy', 'username avatar')
      .sort({ views: -1, createdAt: -1 })
      .limit(12)
      .select('-comments');

    res.json({ videos });
  } catch (error) {
    console.error('Get trending videos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const video = await Video.findOne({ isPublic: true, isProcessed: true })
      .populate('uploadedBy', 'username avatar')
      .sort({ views: -1 })
      .select('-comments');

    res.json({ video });
  } catch (error) {
    console.error('Get featured video error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const video = await Video.findById(req.params.id)
      .populate('uploadedBy', 'username avatar subscribers')
      .populate('comments.user', 'username avatar');

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    if (!video.isPublic || !video.isProcessed) {
      return res.status(403).json({ error: 'Video not available' });
    }

    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({ video });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id/stream', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    if (!video.isPublic || !video.isProcessed) {
      return res.status(403).json({ error: 'Video not available' });
    }

    const videoPath = require('path').join(__dirname, '../uploads', video.filename);
    
    res.setHeader('Content-Type', video.mimetype);
    res.setHeader('Content-Length', video.size);
    
    const fs = require('fs');
    const stream = fs.createReadStream(videoPath);
    stream.pipe(res);
  } catch (error) {
    console.error('Stream video error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const userId = req.user._id;
    const likeIndex = video.likes.indexOf(userId);
    const dislikeIndex = video.dislikes.indexOf(userId);

    if (likeIndex > -1) {
      video.likes.splice(likeIndex, 1);
    } else {
      video.likes.push(userId);
      if (dislikeIndex > -1) {
        video.dislikes.splice(dislikeIndex, 1);
      }
    }

    await video.save();

    res.json({
      likes: video.likes.length,
      dislikes: video.dislikes.length,
      isLiked: video.likes.includes(userId),
      isDisliked: video.dislikes.includes(userId)
    });
  } catch (error) {
    console.error('Like video error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/dislike', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const userId = req.user._id;
    const likeIndex = video.likes.indexOf(userId);
    const dislikeIndex = video.dislikes.indexOf(userId);

    if (dislikeIndex > -1) {
      video.dislikes.splice(dislikeIndex, 1);
    } else {
      video.dislikes.push(userId);
      if (likeIndex > -1) {
        video.likes.splice(likeIndex, 1);
      }
    }

    await video.save();

    res.json({
      likes: video.likes.length,
      dislikes: video.dislikes.length,
      isLiked: video.likes.includes(userId),
      isDisliked: video.dislikes.includes(userId)
    });
  } catch (error) {
    console.error('Dislike video error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/comments', auth, [
  body('text').trim().isLength({ min: 1, max: 1000 }).withMessage('Comment must be 1-1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid video ID' });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const comment = {
      user: req.user._id,
      text: req.body.text
    };

    video.comments.push(comment);
    await video.save();

    const populatedVideo = await Video.findById(req.params.id)
      .populate('comments.user', 'username avatar');

    const newComment = populatedVideo.comments[populatedVideo.comments.length - 1];

    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
