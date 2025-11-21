import Bug from '../models/Bug.js';

export const getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.status(200).json({ success: true, data: bugs });
};

export const addBug = async (req, res) => {
  const newBug = new Bug(req.body);
  await newBug.save();
  res.status(201).json({ success: true, data: newBug });
};

export const updateBug = async (req, res) => {
  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedBug) {
    return null; 
  }
  return updatedBug;
};

export const deleteBug = async (req, res) => {
  const bug = await Bug.findByIdAndDelete(req.params.id);
  if (!bug) {
    return null;
  }
  return bug;
};
