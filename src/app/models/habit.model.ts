

export interface Habit {
  userId: { type: String; required: true };
  title: { type: String; required: true };
  frequency: { type: String; required: true }; // "Daily", "Weekly"
  goal: { type: Number; required: false }; // e.g., 5 days/week
  progress: [
    {
      date: { type: String; required: true };
      completed: { type: Boolean; required: true };
    }
  ];
}
