const express = require('express');
const router = express.Router();
const Task = require('../../models/task');




// Create a new task
router.post('/tasks', async (req, res) => {
    const { title, description, dueDate } = req.body;
    let task = new Task({ title, description, dueDate });
    task = await task.save();
    res.send(task);
});

// Get archived tasks
router.get('/tasks/archived', async (req, res) => {
  try {
    const archivedTasks = await Task.find({ archived: true });
    res.status(200).json(archivedTasks);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching archived tasks', error: err });
  }
});

//get a task by id 
router.get('/tasks/:id', async (req, res) => {
    try {// Get the task ID from the request parameters
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        // Check if the task was found
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.send(task);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching task', error });
    }
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
});



// Update a task status
router.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
      // Validate the request body
        if (!status) {
            return res.status(400).send({ message: 'Status is required' });
        }
        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        // Check if the task was found
        if (!updatedTask) {
            return res.status(404).send({ message: 'Task not found' });
        }
        // Send the updated task
        res.status(200).send(updatedTask);
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).send({ message: 'Error updating task status', error });
    }
});



// Archive task
router.put('/tasks/archive/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { archived: true },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error archiving task', error });
  }
});

  
  // Unarchive task
  router.put('/tasks/unarchive/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      task.archived = false;
      await task.save();
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ message: 'Error unarchiving task', error: err });
    }
  });
  
  // Get archived tasks
  router.get('/tasks/archived', async (req, res) => {
    try {
      const archivedTasks = await Task.find({ archived: true });
      res.status(200).json(archivedTasks);
    } catch (err) {
      res.status(400).json({ message: 'Error fetching archived tasks', error: err });
    }
  });











module.exports = router;