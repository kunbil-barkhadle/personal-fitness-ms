import mongoose from 'mongoose';

const FitnessGoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['weight', 'strength', 'cardio', 'flexibility', 'habit', 'custom'],
    required: true
  },
  targetValue: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  unit: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'completed', 'failed', 'paused'], default: 'active' },
  milestones: [{
    title: { type: String },
    targetValue: { type: Number },
    reached: { type: Boolean, default: false },
    reachedAt: { type: Date }
  }]
});

export default mongoose.model('FitnessGoal', FitnessGoalSchema);
