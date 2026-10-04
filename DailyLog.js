import mongoose from 'mongoose';

const DailyLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  water: { 
    glasses: { type: Number, default: 0 },
    goal: { type: Number, default: 8 }
  },
  sleep: { 
    hours: { type: Number, default: 0 },
    quality: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] }
  },
  steps: { 
    count: { type: Number, default: 0 },
    goal: { type: Number, default: 10000 }
  },
  workout: { 
    completed: { type: Boolean, default: false },
    type: { type: String },
    duration: { type: Number },
    calories: { type: Number },
    intensity: { type: String, enum: ['low', 'medium', 'high'] }
  },
  meals: [{ 
    name: { type: String },
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    healthy: { type: Boolean },
    calories: { type: Number }
  }],
  meditation: { 
    minutes: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
  },
  mood: { type: String, enum: ['great', 'good', 'okay', 'bad', 'terrible'] },
  notes: { type: String }
});

DailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyLog', DailyLogSchema);
