import HabitLog from '../models/HabitLog.js';
import { getStartOfDay, getDateRange } from '../utils/helpers.js';

export const getHabitLogs = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { habit: req.params.habitId, user: req.user.id };
    if (startDate && endDate) {
      query.date = { $gte: getStartOfDay(startDate), $lte: getStartOfDay(endDate) };
    }
    const logs = await HabitLog.find(query).sort({ date: 1 });
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

export const logHabit = async (req, res, next) => {
  try {
    const { date, completed, value, notes } = req.body;
    const logDate = getStartOfDay(date || new Date());
    let log = await HabitLog.findOneAndUpdate(
      { habit: req.params.habitId, user: req.user.id, date: logDate },
      { completed, value, notes },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};

export const getHabitHistory = async (req, res, next) => {
  try {
    const endDate = getStartOfDay();
    const startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - 365);
    
    const logs = await HabitLog.find({ 
      habit: req.params.habitId, 
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });
    
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};
