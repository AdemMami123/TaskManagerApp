export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'inprogress' | 'completed'; // Add status property
    archived: { type: Boolean, default: false }
   userId: string; // userId to associate the task with a user
  }
  