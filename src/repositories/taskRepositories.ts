import { TaskModel } from "@models/Tasks";
import { Query } from "types/RepositoryTypes";
import { ITaskRepository, SearchTasks, Tasks } from "types/TasksTypes";

export class TaskRepository implements ITaskRepository {
  async create(data: Tasks): Promise<Tasks> {
    const newTasks = new TaskModel(data);
    return await newTasks.save();
  }

  async find(query?: Query): Promise<Tasks[]> {
    return await TaskModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Tasks | null> {
    return await TaskModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Tasks>): Promise<Tasks | null> {
    return await TaskModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await TaskModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
