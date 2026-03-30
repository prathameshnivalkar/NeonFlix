const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Video = require('../models/Video');
const { auth } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4, WebM, and OGG files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 2 * 1024 * 1024 * 1024 // 2GB default
  }
});

router.post('/video', auth, upload.single('video'), [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
  body('description').optional().trim().isLength({ max: 5000 }).withMessage('Description must be less than 5000 characters'),
  body('category').optional().isIn(['entertainment', 'education', 'gaming', 'music', 'sports', 'news', 'technology']),
  body('tags').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const { title, description, category, tags } = req.body;
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const video = new Video({
      title,
      description: description || '',
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      duration: 0,
      uploadedBy: req.user._id,
      category: category || 'entertainment',
      tags: tagsArray,
      processingStatus: 'pending'
    });

    await video.save();

    setTimeout(() => {
      processVideo(video._id);
    }, 1000);

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: {
        id: video._id,
        title: video.title,
        filename: video.filename,
        size: video.size,
        processingStatus: video.processingStatus
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/thumbnail', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No thumbnail file uploaded' });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, and GIF files are allowed.' });
    }

    res.status(201).json({
      message: 'Thumbnail uploaded successfully',
      thumbnail: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    console.error('Thumbnail upload error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

async function processVideo(videoId) {
  try {
    const video = await Video.findById(videoId);
    if (!video) return;

    await Video.findByIdAndUpdate(videoId, { processingStatus: 'processing' });

    const ffmpeg = require('fluent-ffmpeg');
    const videoPath = path.join(__dirname, '../uploads', video.filename);
    
    ffmpeg.ffprobe(videoPath, async (err, metadata) => {
      if (err) {
        console.error('FFprobe error:', err);
        await Video.findByIdAndUpdate(videoId, { processingStatus: 'failed' });
        return;
      }

      const duration = metadata.format.duration;
      
      const thumbnailPath = path.join(__dirname, '../uploads', `${video.filename}_thumbnail.jpg`);
      
      ffmpeg(videoPath)
        .screenshots({
          timestamps: ['10%'],
          filename: `${video.filename}_thumbnail.jpg`,
          folder: path.join(__dirname, '../uploads'),
          size: '1280x720'
        })
        .on('end', async () => {
          await Video.findByIdAndUpdate(videoId, {
            duration,
            thumbnail: `/uploads/${video.filename}_thumbnail.jpg`,
            processingStatus: 'completed',
            isProcessed: true
          });
        })
        .on('error', async (err) => {
          console.error('Thumbnail generation error:', err);
          await Video.findByIdAndUpdate(videoId, { processingStatus: 'failed' });
        });
    });
  } catch (error) {
    console.error('Video processing error:', error);
    await Video.findByIdAndUpdate(videoId, { processingStatus: 'failed' });
  }
}

module.exports = router;
