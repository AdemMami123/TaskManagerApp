const express = require('express');
const router = express.Router();
const Habit =require( '../../models/habit');



// Create a new habit
router.post('/habit', async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.status(201).send(habit);
});

// Get all habits
router.get('/allhabits', async (req, res) => {
  try {
    const habits = await Habit.find(); // Fetch all habits without filtering by userId
    res.send(habits);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch habits.' });
  }
});

// Update progress for a habit
router.put('/:id/progress', async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  habit.progress.push(req.body); // Add progress entry
  await habit.save();
  res.send(habit);
});

// Delete a habit
router.delete('/habit/:habitId', async (req, res) => {
  try {
    const habitId = req.params.habitId; // Correctly use habitId
    await Habit.findByIdAndDelete(habitId); // Pass habitId to findByIdAndDelete
    res.status(204).send(); // Send no-content response on success
  } catch (error) {
    res.status(500).send({ error: error.message }); // Send error response on failure
  }
});
//mark habit as completed
router.post('/habit/mark-completed/:habitId', async (req, res) => {
  const habitId = req.params.habitId;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
  
  try {
    // Check if the habit exists
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).send('Habit not found');
    }

    // Check if the habit has already been marked as completed today
    const todayProgress = habit.progress.find(
      (p) => p.date === today && p.completed === true
    );
    if (todayProgress) {
      return res.status(400).send('Already marked as completed today');
    }

    // Add the completed progress for today
    habit.progress.push({
      date: today,
      completed: true,
    });

    await habit.save();
    res.status(200).send('Progress updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
