const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Video = require('../models/Video');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const videos = await Video.find({ 
      uploadedBy: req.params.userId,
      isPublic: true,
      isProcessed: true 
    })
    .populate('uploadedBy', 'username avatar')
    .sort({ createdAt: -1 })
    .select('-comments');

    res.json({
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        website: user.website,
        subscribers: user.subscribers.length,
        subscribedTo: user.subscribedTo.length,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      },
      videos
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId/videos', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ 
      uploadedBy: req.params.userId,
      isPublic: true,
      isProcessed: true 
    })
    .populate('uploadedBy', 'username avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-comments');

    const total = await Video.countDocuments({ 
      uploadedBy: req.params.userId,
      isPublic: true,
      isProcessed: true 
    });

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
    console.error('Get user videos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:userId/subscribe', auth, async (req, res) => {
  try {
    if (req.params.userId === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot subscribe to yourself' });
    }

    const targetUser = await User.findById(req.params.userId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentUser = await User.findById(req.user._id);
    
    const isSubscribed = currentUser.subscribedTo.includes(req.params.userId);
    
    if (isSubscribed) {
      currentUser.subscribedTo = currentUser.subscribedTo.filter(
        id => id.toString() !== req.params.userId
      );
      targetUser.subscribers = targetUser.subscribers.filter(
        id => id.toString() !== req.user._id.toString()
      );
    } else {
      currentUser.subscribedTo.push(req.params.userId);
      targetUser.subscribers.push(req.user._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      subscribed: !isSubscribed,
      subscribersCount: targetUser.subscribers.length
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me/videos', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ uploadedBy: req.user._id })
    .populate('uploadedBy', 'username avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-comments');

    const total = await Video.countDocuments({ uploadedBy: req.user._id });

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
    console.error('Get my videos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me/liked', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ 
      likes: req.user._id,
      isPublic: true,
      isProcessed: true 
    })
    .populate('uploadedBy', 'username avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-comments');

    const total = await Video.countDocuments({ 
      likes: req.user._id,
      isPublic: true,
      isProcessed: true 
    });

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
    console.error('Get liked videos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me/subscriptions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'subscribedTo',
        select: 'username avatar subscribers isVerified',
        populate: {
          path: 'subscribers',
          select: 'username'
        }
      });

    const subscriptions = user.subscribedTo.map(subscribedUser => ({
      id: subscribedUser._id,
      username: subscribedUser.username,
      avatar: subscribedUser.avatar,
      subscribers: subscribedUser.subscribers.length,
      isVerified: subscribedUser.isVerified,
      isSubscribed: true
    }));

    res.json({ subscriptions });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
