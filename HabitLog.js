import mongoose from 'mongoose';

const HabitLogSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  value: { type: Number, default: 0 },
  notes: { type: String }
});

HabitLogSchema.index({ habit: 1, date: 1 }, { unique: true });

export default mongoose.model('HabitLog', HabitLogSchema);
