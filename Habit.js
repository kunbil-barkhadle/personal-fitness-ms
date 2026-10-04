import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['workout', 'water', 'sleep', 'steps', 'meals', 'meditation', 'custom'], 
    required: true 
  },
  icon: { type: String, default: '💪' },
  color: { type: String, default: '#6366f1' },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  targetValue: { type: Number, default: 1 },
  unit: { type: String, default: 'times' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

HabitSchema.virtual('currentStreak', {
  ref: 'HabitLog',
  localField: '_id',
  foreignField: 'habit',
  justOne: false,
});

export default mongoose.model('Habit', HabitSchema);
