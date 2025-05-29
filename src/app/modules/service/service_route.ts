import express from "express";
import { ServiceControllers } from "./service_controller";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidation } from "./service_validationZodSchema";

const router = express.Router();

// create a service route.
router.post(
  "/",
  validateRequest(ServiceValidation.createServiceValidationZodSchema),
  ServiceControllers.createService,
);

// fetch all services
router.get("/", ServiceControllers.getAllServices);

// fetch overdue services
router.get("/status", ServiceControllers.getOverDueServices);

// fetch single service by id
router.get(
  "/:id",
  validateRequest(ServiceValidation.getSingleServiceID_ValidationSchema),
  ServiceControllers.getSingleServiceById,
);

// update service by id
router.put(
  "/:id/complete",
  validateRequest(ServiceValidation.updateSevice_ValidationSchema),
  ServiceControllers.updateServiceByID,
);

export const ServiceRoutes = router;
