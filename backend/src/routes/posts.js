import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postsController.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(getPosts));
router.get('/:id', asyncHandler(getPostById));
router.post('/', asyncHandler(createPost));
router.put('/:id', asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

export default router;
