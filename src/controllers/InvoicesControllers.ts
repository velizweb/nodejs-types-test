import { CustomerRepository } from "@repositories/customerRepositories";
import { InvoicesRepository } from "@repositories/invoicesRepository";
import { CustomerService } from "@services/CustomerService";
import { InvoiceService } from "@services/InvoicesService";
import { ICustomerRepository, ICustomerService } from "types/CustomerTypes";
import { Request, Response } from "express";
import { IInvoicesRepository, IInvoicesService, Invoice } from "types/InvoicesTypes";

const invoicesRepository: IInvoicesRepository = new InvoicesRepository();
const invoicesService: IInvoicesService = new InvoiceService(invoicesRepository);

const customerRepository: ICustomerRepository = new CustomerRepository();
const customerService: ICustomerService = new CustomerService(customerRepository);

export const findInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await invoicesService.findInvoices({}, {}, { limit: 5 });
    if (invoices.length === 0) return res.status(404).json({ message: "no Invoices Found." });
    const result = invoices.map(x => {
      return {
        id: x._id,
        amount: x.amount,
        email: x.customer.email,
        image_url: x.customer.image_url,
        name: x.customer.name
      };
    });

    res.json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findInvoicesById = async (req: Request, res: Response) => {
  try {
    const invoices = await invoicesService.findInvoiceById(req.params.id);
    if (!invoices) return res.status(404).json({ message: "Not role Found" });

    const result = {
      id: invoices._id,
      customer_id: invoices.customer._id,
      amount: invoices.amount,
      status: invoices.status
    };

    res.json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createInvoices = async (req: Request, res: Response) => {
  const customerID = req.body.customer;
  try {
    const customerExists = await customerService.findCustomerById(customerID);
    if (!customerExists) return res.status(400).json({ message: "Customer does not exists" });

    const newInvoice: Invoice = req.body;
    const result = await invoicesService.createInvoice(newInvoice);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await invoicesService.updateInvoice(req.params.id, req.body);
    if (!invoices) return res.status(404).json({ message: "Not Invoice Found" });

    res.json(invoices);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await invoicesService.deleteInvoice(req.params.id);
    if (!invoices) return res.status(404).json({ message: "Not Invoice Found" });

    res.json(invoices);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const getInvoiceStatusCount = async (_: Request, res: Response) => {
  try {
    const invoices = await invoicesService.invoicesStatusCount();
    if (!invoices) return res.status(404).json({ message: "Not Invoice Found" });

    res.json(invoices);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const getInvoiceCount = async (_: Request, res: Response) => {
  try {
    const invoices = await invoicesService.invoicesCount();
    if (!invoices) return res.status(404).json({ message: "Not Invoice Found" });

    res.json(invoices);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const getInvoicesPaginated = async (req: Request, res: Response) => {
  try {
    const invoices = await invoicesService.invoicePaginated(req.query.q as string, Number(req.query.page));
    if (!invoices) return res.status(404).json({ message: "Not Invoice Found" });

    res.json(invoices);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const getInvoicePageCount = async (req: Request, res: Response) => {
  const itemsParPage = 6;
  try {
    const invoices = await invoicesService.invoicesPagesCount(req.query.q as string);
    console.log("invoices from invoice count:>> ", invoices);
    if (!invoices) return res.status(404).json({ message: "Not Invoice Found" });

    const { totalCount } = invoices;

    const totalPages = Math.ceil(totalCount / itemsParPage);

    res.json(totalPages);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
