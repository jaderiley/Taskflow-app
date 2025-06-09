import User from '../models/User.js';

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const { username, emails } = req.body;
  try {
    req.user.username = username || req.user.username;
    if (emails) req.user.emails = emails;
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};