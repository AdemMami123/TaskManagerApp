const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    dueDate: {
        
        type: Date,
        required: true,
    },
    archived: { type: Boolean, default: false },
    
  
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
module.exports = Task;
