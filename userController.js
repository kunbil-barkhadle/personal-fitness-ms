import User from '../models/User.js';
import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import DailyLog from '../models/DailyLog.js';
import FitnessGoal from '../models/FitnessGoal.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, age, weight, height, fitnessLevel } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, age, weight, height, fitnessLevel },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    const currentPassword = req.body.currentPassword || req.body.oldPassword;
    if (!(await user.matchPassword(currentPassword))) {
      return next(new ErrorResponse('Incorrect current password', 401));
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    // Cascade delete all user data
    await HabitLog.deleteMany({ user: req.user.id });
    await Habit.deleteMany({ user: req.user.id });
    await DailyLog.deleteMany({ user: req.user.id });
    await FitnessGoal.deleteMany({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
