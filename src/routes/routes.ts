import { Router } from "express";
import { createRoles, deleteRoles, findRoles, findRolesById, updateRoles } from "@controllers/rolesControllers";
import { createUser, deleteUser, findUsers, findUsersById, updateUser } from "@controllers/usersControllers";
import { loginUser, registerUser } from "@controllers/auth/authControllers";
import { getPermissons, verifyToken } from "@middlewares/auth";
import { checkRoles } from "@middlewares/roles";
import { createTasks, deleteTask, findTaskById, findTasks,updateTask } from "@controllers/TasksControllers";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.send("Api is Healthy!!!");
  });

  // Auth Routes
  router.post("/auth/register", checkRoles, registerUser);
  router.post("/auth/login", loginUser);

  // Users Routes
  router.get("/users", verifyToken, getPermissons, findUsers);
  router.get("/users/:id", verifyToken, getPermissons, findUsersById);
  router.post("/users", verifyToken, getPermissons, checkRoles, createUser);
  router.put("/users/:id", verifyToken, getPermissons, updateUser);
  router.delete("/users/:id", verifyToken, getPermissons, deleteUser);

  // Roles Routes
  router.get("/roles", verifyToken, getPermissons, findRoles);
  router.get("/roles/:id", verifyToken, getPermissons, findRolesById);
  router.post("/roles", verifyToken, getPermissons, createRoles);
  //router.post("/roles", createRoles);
  router.put("/roles/:id", verifyToken, getPermissons, updateRoles);
  router.delete("/roles/:id", verifyToken, getPermissons, deleteRoles);

  // Task Routes
  //router.get("/task", findTasks);
  router.get("/task", verifyToken, getPermissons, findTasks);

  router.get("/task/:id", verifyToken, getPermissons,findTaskById);
  //router.post("/task", createTasks);
  router.post("/task", verifyToken, getPermissons, createTasks);
  router.put("/task/:id", verifyToken, getPermissons, updateTask);
  router.delete("/task/:id", verifyToken, getPermissons, deleteTask);


  return router;
};
