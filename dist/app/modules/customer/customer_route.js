"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const customer_validationZodSchema_1 = require("./customer_validationZodSchema");
const customer_controller_1 = require("./customer_controller");
const router = express_1.default.Router();
// create a customer
router.post("/", (0, validateRequest_1.default)(customer_validationZodSchema_1.CustomerValidation.createCustomerValidationSchema), customer_controller_1.CustomerControllers.createCustomer);
// get all customers
router.get("/", customer_controller_1.CustomerControllers.fetchAllCustomers);
// get single customer by id
router.get("/:id", (0, validateRequest_1.default)(customer_validationZodSchema_1.CustomerValidation.getSingleCustomerID_ValidationSchema), customer_controller_1.CustomerControllers.getSingleCustomerById);
// update customer by id
router.put("/:id", (0, validateRequest_1.default)(customer_validationZodSchema_1.CustomerValidation.getSingleCustomerID_ValidationSchema), customer_controller_1.CustomerControllers.updateCustomerById);
// delete customer by id
router.delete("/:id", (0, validateRequest_1.default)(customer_validationZodSchema_1.CustomerValidation.getSingleCustomerID_ValidationSchema), customer_controller_1.CustomerControllers.deleteCustomerById);
exports.CustomerRoutes = router;
