// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: { type: String, default: "medium" },
  status: { type: String, default: "todo" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: String,
  list: {
    type: String,
    enum: ["Work", "School", "General"],
    default: "General"
  },
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);
