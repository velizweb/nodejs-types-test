import { Request, Response } from "express";
import { TaskRepository } from "@repositories/taskRepositories";
import { TaskService } from "@services/TaskService";
import { ITaskRepository, ITasksService, Tasks } from "types/TasksTypes";

const taskRepository: ITaskRepository = new TaskRepository();
const taskService: ITasksService = new TaskService(taskRepository);

export const findTasks = async (req: Request, res: Response) => {
  try {
    const task = await taskService.findTasks();
    //if (task.length === 0) return res.status(404).json({ message: "no Task Found." });

    res.json(task);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.findTasksById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not Task Found" });

    res.json(task);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createTasks = async (req: Request, res: Response) => {
  try {
    const newTask: Tasks = req.body;
    const result = await taskService.createTasks(newTask);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTasks(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: "Not Task Found" });

    res.json(task);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.deleteTasks(req.params.id);
    if (!task) return res.status(404).json({ message: "Not Task Found" });

    res.json(task);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

