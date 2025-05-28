import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidation } from "./customer_validationZodSchema";
import { CustomerControllers } from "./customer_controller";

const router = express.Router();

// create a customer
router.post(
  "/",
  validateRequest(CustomerValidation.createCustomerValidationSchema),
  CustomerControllers.createCustomer
);

// get all customers
router.get("/", CustomerControllers.fetchAllCustomers);

// get single customer by id
router.get(
  "/:id",
  validateRequest(CustomerValidation.getSingleCustomerID_ValidationSchema),
  CustomerControllers.getSingleCustomerById
);

// update customer by id
router.put(
  "/:id",
  validateRequest(CustomerValidation.updateCustomerValidationSchema),
  CustomerControllers.updateCustomerById
);
// delete customer by id
router.delete(
  "/:id",
  validateRequest(CustomerValidation.getSingleCustomerID_ValidationSchema),
  CustomerControllers.deleteCustomerById
);
export const CustomerRoutes = router;
