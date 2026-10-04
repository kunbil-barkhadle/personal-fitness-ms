import DailyLog from '../models/DailyLog.js';
import HabitLog from '../models/HabitLog.js';
import Habit from '../models/Habit.js';
import { getStartOfDay, calculateStreak } from '../utils/helpers.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const today = getStartOfDay();
    const dailyLog = await DailyLog.findOne({ user: req.user.id, date: today });
    const habits = await Habit.find({ user: req.user.id, isActive: true });
    const habitLogs = await HabitLog.find({ user: req.user.id, date: today });
    
    const habitsCompleted = habitLogs.filter(log => log.completed).length;
    let totalStreak = 0;
    for (const habit of habits) {
      totalStreak += await calculateStreak(HabitLog, habit._id);
    }

    res.status(200).json({
      success: true,
      data: {
        habitsCompleted,
        totalHabits: habits.length,
        water: dailyLog?.water || { glasses: 0, goal: 8 },
        steps: dailyLog?.steps || { count: 0, goal: 10000 },
        sleep: dailyLog?.sleep || { hours: 0 },
        workout: dailyLog?.workout || { completed: false },
        totalStreak
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getWeeklyStats = async (req, res, next) => {
  try {
    const endDate = getStartOfDay();
    const startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - 6);

    const logs = await DailyLog.find({
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

export const getMonthlyStats = async (req, res, next) => {
  try {
    const endDate = getStartOfDay();
    const startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - 29);

    const logs = await DailyLog.find({
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    });

    let totalWater = 0, totalSleep = 0, totalSteps = 0, workouts = 0;
    logs.forEach(log => {
      totalWater += log.water?.glasses || 0;
      totalSleep += log.sleep?.hours || 0;
      totalSteps += log.steps?.count || 0;
      if (log.workout?.completed) workouts++;
    });

    res.status(200).json({
      success: true,
      data: {
        avgWater: logs.length ? totalWater / logs.length : 0,
        avgSleep: logs.length ? totalSleep / logs.length : 0,
        avgSteps: logs.length ? totalSteps / logs.length : 0,
        totalWorkouts: workouts,
        logsCount: logs.length
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getStreaks = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    const streaks = [];
    for (const habit of habits) {
      const streak = await calculateStreak(HabitLog, habit._id);
      streaks.push({ habit: habit._id, name: habit.name, streak });
    }
    res.status(200).json({ success: true, data: streaks });
  } catch (err) {
    next(err);
  }
};
