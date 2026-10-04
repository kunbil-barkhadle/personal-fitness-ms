import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import { ErrorResponse } from '../middleware/errorHandler.js';
import { calculateStreak, getStartOfDay } from '../utils/helpers.js';

export const getHabits = async (req, res, next) => {
  try {
    const query = { user: req.user.id };
    if (req.query.category) query.category = req.query.category;
    
    const habits = await Habit.find(query);
    const habitsWithStreak = await Promise.all(habits.map(async (habit) => {
      const streak = await calculateStreak(HabitLog, habit._id);
      return { ...habit.toObject(), currentStreak: streak };
    }));
    
    res.status(200).json({ success: true, data: habitsWithStreak });
  } catch (err) {
    next(err);
  }
};

export const getHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Habit not found', 404));
    }
    const streak = await calculateStreak(HabitLog, habit._id);
    res.status(200).json({ success: true, data: { ...habit.toObject(), currentStreak: streak } });
  } catch (err) {
    next(err);
  }
};

export const createHabit = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const habit = await Habit.create(req.body);
    res.status(201).json({ success: true, data: habit });
  } catch (err) {
    next(err);
  }
};

export const updateHabit = async (req, res, next) => {
  try {
    let habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Habit not found', 404));
    }
    habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: habit });
  } catch (err) {
    next(err);
  }
};

export const deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Habit not found', 404));
    }
    await Habit.findByIdAndDelete(req.params.id);
    await HabitLog.deleteMany({ habit: req.params.id });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

export const toggleHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Habit not found', 404));
    }
    const today = getStartOfDay();
    let log = await HabitLog.findOne({ habit: req.params.id, date: today });
    if (log) {
      log.completed = !log.completed;
      await log.save();
    } else {
      log = await HabitLog.create({
        habit: req.params.id,
        user: req.user.id,
        date: today,
        completed: true
      });
    }
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
};
