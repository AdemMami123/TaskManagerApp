// src/models/habit.model.ts
const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
 
  title: { type: String, required: true },
  frequency: { type: String, required: true }, // "Daily", "Weekly"
  goal: { type: Number, required: false }, // e.g., 5 days/week
  progress: [
    {
      date: { type: String, required: true },
      completed: { type: Boolean, required: true },
    },
  ],
});

const Habit = mongoose.model('Habit', HabitSchema);
module.exports = Habit;
