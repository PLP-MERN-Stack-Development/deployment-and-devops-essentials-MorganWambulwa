import Post from '../models/Post.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ success: false, message: 'Validation failed: title, content and category are required' });
  }

  const slug =
    (title || 'post').toLowerCase().replace(/\s+/g, '-').slice(0, 50) +
    '-' +
    Date.now().toString().slice(-4);

  const author = req.user && req.user.id ? req.user.id : null;

  const newPost = await Post.create({ title, content, category, author, slug });
  res.status(201).json({ success: true, data: newPost });
});

export const getPosts = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const posts = await Post.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: posts });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  res.status(200).json({ success: true, data: post });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (!req.user || req.user.id.toString() !== post.author.toString()) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  Object.assign(post, req.body);
  await post.save();
  res.status(200).json({ success: true, data: post });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (!req.user || req.user.id.toString() !== post.author.toString()) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  await post.remove();
  res.status(200).json({ success: true, message: 'Post deleted successfully' });
});
