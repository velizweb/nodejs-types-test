import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Tasks extends Document {
  title: string;
  description: string;
  state: boolean;
}

export interface ITaskRepository extends Repository<Tasks> {
}

export type SearchTasks = Tasks;

export interface ITasksService {
  createTasks(Tasks: Tasks): Promise<Tasks>;
  findTasks(query?: Query): Promise<Tasks[]>;
  findTasksById(id: string): Promise<Tasks | null>;
  updateTasks(id: string, Tasks: Partial<Tasks>): Promise<Tasks | null>;
  deleteTasks(id: string): Promise<boolean>;
}
