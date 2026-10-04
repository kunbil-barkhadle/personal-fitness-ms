import DailyLog from '../models/DailyLog.js';
import { getStartOfDay } from '../utils/helpers.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

export const getDailyLog = async (req, res, next) => {
  try {
    const targetDate = getStartOfDay(req.params.date);
    let log = await DailyLog.findOne({ user: req.user.id, date: targetDate });
    if (!log) {
      log = await DailyLog.create({ user: req.user.id, date: targetDate });
    }
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};

export const updateDailyLog = async (req, res, next) => {
  try {
    const targetDate = getStartOfDay(req.params.date);
    let log = await DailyLog.findOneAndUpdate(
      { user: req.user.id, date: targetDate },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};

export const getDailyLogs = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { user: req.user.id };
    if (startDate && endDate) {
      query.date = { $gte: getStartOfDay(startDate), $lte: getStartOfDay(endDate) };
    }
    const logs = await DailyLog.find(query).sort({ date: 1 });
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

export const addMeal = async (req, res, next) => {
  try {
    const targetDate = getStartOfDay(req.params.date);
    const log = await DailyLog.findOneAndUpdate(
      { user: req.user.id, date: targetDate },
      { $push: { meals: req.body } },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};

export const deleteMeal = async (req, res, next) => {
  try {
    const targetDate = getStartOfDay(req.params.date);
    const log = await DailyLog.findOneAndUpdate(
      { user: req.user.id, date: targetDate },
      { $pull: { meals: { _id: req.params.mealId } } },
      { new: true }
    );
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};
