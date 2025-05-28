"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerControllers = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const customer_service_1 = require("./customer_service");
// create customer controller
const createCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerServices.createCustomer(req.body);
    (0, sendResponse_1.default)(res, {
        status: 201,
        success: true,
        message: "Customer created successfully",
        data: result,
    });
}));
// get all customers controller
const fetchAllCustomers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerServices.fetchAllCustomersFromDB();
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Customers fetched successfully",
        data: result,
    });
}));
// get single customer by id controller
const getSingleCustomerById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerServices.fetchSingleCustomerByIdIntoDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Customer fetched successfully",
        data: result,
    });
}));
// update customer by id controller
const updateCustomerById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerServices.updateCustomerInfoIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Customer updated successfully",
        data: result,
    });
}));
// delete customer by id controller
const deleteCustomerById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerServices.deleteCustomerIntoDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Customer deleted successfully",
        data: result,
    });
}));
exports.CustomerControllers = {
    createCustomer,
    fetchAllCustomers,
    getSingleCustomerById,
    updateCustomerById,
    deleteCustomerById,
};
