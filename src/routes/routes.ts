import { Router } from "express";
import { createRoles, deleteRoles, findRoles, findRolesById, updateRoles } from "@controllers/rolesControllers";
import { createUser, deleteUser, findUsers, findUsersById, updateUser } from "@controllers/usersControllers";
import { loginUser, registerUser } from "@controllers/auth/authControllers";
import { getPermissons, verifyToken } from "@middlewares/auth";
import { checkRoles } from "@middlewares/roles";
import {
  createCustomer,
  customerCount,
  deleteCustomer,
  findCustomer,
  findCustomerById,
  searchCustomer,
  updateCustomer
} from "@controllers/customerControllers";
import {
  createInvoices,
  deleteInvoices,
  findInvoices,
  findInvoicesById,
  getInvoiceCount,
  getInvoicePageCount,
  getInvoicesPaginated,
  getInvoiceStatusCount,
  updateInvoices
} from "@controllers/InvoicesControllers";
import { findRevenue } from "@controllers/revenueControllers";

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
  router.put("/roles/:id", verifyToken, getPermissons, updateRoles);
  router.delete("/roles/:id", verifyToken, getPermissons, deleteRoles);

  // Customer Routes
  router.get("/customer", verifyToken, getPermissons, findCustomer);
  router.get("/customer/search", verifyToken, getPermissons, searchCustomer);
  router.get("/customer/count", verifyToken, getPermissons, customerCount);
  router.get("/customer/:id", verifyToken, getPermissons, findCustomerById);
  router.post("/customer", verifyToken, getPermissons, createCustomer);
  router.put("/customer/:id", verifyToken, getPermissons, updateCustomer);
  router.delete("/customer/:id", verifyToken, getPermissons, deleteCustomer);

  // Invoices Routes
  router.get("/invoices", verifyToken, getPermissons, findInvoices);
  router.get("/invoices/paginate", verifyToken, getPermissons, getInvoicesPaginated);
  router.get("/invoices/status-count", verifyToken, getPermissons, getInvoiceStatusCount);
  router.get("/invoices/page-count", verifyToken, getPermissons, getInvoicePageCount);
  router.get("/invoices/count", verifyToken, getPermissons, getInvoiceCount);
  router.get("/invoice/:id", verifyToken, getPermissons, findInvoicesById);
  router.post("/invoices", verifyToken, getPermissons, createInvoices);
  router.put("/invoices/:id", verifyToken, getPermissons, updateInvoices);
  router.delete("/invoices/:id", verifyToken, getPermissons, deleteInvoices);

  // Revenue Route
  router.get("/revenues", verifyToken, getPermissons, findRevenue);

  return router;
};
