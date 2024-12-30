import mongoose, { Schema } from "mongoose";
import { Tasks } from "types/TasksTypes";

const TaskSchema: Schema = new Schema<Tasks>(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      unique: true
    },
    state: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const TaskModel = mongoose.model<Tasks>("tasks", TaskSchema);
