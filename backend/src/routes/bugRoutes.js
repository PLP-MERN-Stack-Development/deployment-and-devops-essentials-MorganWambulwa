import express from 'express';
import { getBugs, addBug, updateBug, deleteBug } from '../controllers/bugController.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(getBugs));
router.post('/', asyncHandler(addBug));
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedBug = await updateBug(req, res);
  if (!updatedBug) {
    return res.status(404).json({ success: false, message: 'Bug not found' });
  }
  res.status(200).json({ success: true, data: updatedBug });
}));
router.delete('/:id', asyncHandler(async (req, res) => {
  const deleted = await deleteBug(req, res);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Bug not found' });
  }
  res.status(200).json({ success: true, message: 'Bug deleted successfully' });
}));

export default router;
