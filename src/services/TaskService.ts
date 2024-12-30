import { Query } from "types/RepositoryTypes";
import { ITasksService, ITaskRepository, Tasks, SearchTasks } from "types/TasksTypes";

export class TaskService implements ITasksService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTasks(task: Tasks): Promise<Tasks> {
    return this.taskRepository.create(task);
  }

  async findTasks(query?: Query): Promise<Tasks[]> {
    return this.taskRepository.find(query);
  }

  async findTasksById(id: string): Promise<Tasks | null> {
    return this.taskRepository.findById(id);
  }

  async updateTasks(id: string, task: Partial<Tasks>): Promise<Tasks | null> {
    return this.taskRepository.update(id, task);
  }

  async deleteTasks(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }

}
