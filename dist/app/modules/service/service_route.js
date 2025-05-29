"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service_controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validationZodSchema_1 = require("./service_validationZodSchema");
const router = express_1.default.Router();
// create a service route.
router.post("/", (0, validateRequest_1.default)(service_validationZodSchema_1.ServiceValidation.createServiceValidationZodSchema), service_controller_1.ServiceControllers.createService);
// fetch all services
router.get("/", service_controller_1.ServiceControllers.getAllServices);
// fetch overdue services
router.get("/status", service_controller_1.ServiceControllers.getOverDueServices);
// fetch single service by id
router.get("/:id", (0, validateRequest_1.default)(service_validationZodSchema_1.ServiceValidation.getSingleServiceID_ValidationSchema), service_controller_1.ServiceControllers.getSingleServiceById);
// update service by id
router.put("/:id/complete", (0, validateRequest_1.default)(service_validationZodSchema_1.ServiceValidation.updateSevice_ValidationSchema), service_controller_1.ServiceControllers.updateServiceByID);
exports.ServiceRoutes = router;
