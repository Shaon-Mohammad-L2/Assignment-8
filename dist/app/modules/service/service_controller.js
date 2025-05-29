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
exports.ServiceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const service_service_1 = require("./service_service");
// create a service controller
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.createServiceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        status: 201,
        success: true,
        message: "Service created successfully",
        data: result,
    });
}));
// fetch all services
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.fetchAllServicesFromDB();
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Services fetched successfully",
        data: result,
    });
}));
// fetch single sercice by id
const getSingleServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.fetchSingleServiceById(req.params.id);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Service fetched successfully",
        data: result,
    });
}));
// update service by id
const updateServiceByID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.updateService_byID_intoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Service updated successfully",
        data: result,
    });
}));
// fetch overdue services
const getOverDueServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.fetchOverDueServices();
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: "Overdue or pending services fetched successfully",
        data: result,
    });
}));
exports.ServiceControllers = {
    createService,
    getAllServices,
    getSingleServiceById,
    updateServiceByID,
    getOverDueServices,
};
