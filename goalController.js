import FitnessGoal from '../models/FitnessGoal.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

export const getGoals = async (req, res, next) => {
  try {
    let query = { user: req.user.id };
    if (req.query.status) query.status = req.query.status;
    const goals = await FitnessGoal.find(query);
    res.status(200).json({ success: true, data: goals });
  } catch (err) {
    next(err);
  }
};

export const getGoal = async (req, res, next) => {
  try {
    const goal = await FitnessGoal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Goal not found', 404));
    }
    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};

export const createGoal = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const goal = await FitnessGoal.create(req.body);
    res.status(201).json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};

export const updateGoal = async (req, res, next) => {
  try {
    let goal = await FitnessGoal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Goal not found', 404));
    }
    
    if (req.body.currentValue >= req.body.targetValue || req.body.currentValue >= goal.targetValue) {
      req.body.status = 'completed';
    }
    
    goal = await FitnessGoal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await FitnessGoal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Goal not found', 404));
    }
    await FitnessGoal.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    let goal = await FitnessGoal.findById(req.params.id);
    if (!goal || goal.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Goal not found', 404));
    }
    goal.currentValue = req.body.currentValue;
    if (goal.currentValue >= goal.targetValue) {
      goal.status = 'completed';
    }
    await goal.save();
    res.status(200).json({ success: true, data: goal });
  } catch (err) {
    next(err);
  }
};
