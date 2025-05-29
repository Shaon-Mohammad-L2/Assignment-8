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
exports.ServiceServices = void 0;
const prisma_1 = require("../../../../generated/prisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_2 = __importDefault(require("../../shared/prisma"));
// create a service
const createServiceIntoDB = (paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma_2.default.bike.findUnique({
        where: {
            bikeId: paylaod.bikeId,
        },
    });
    if (!bike) {
        throw new AppError_1.default(404, "bikeId", "Bike not found");
    }
    // allow payload.
    paylaod.status = prisma_1.ServiceStatus.PENDING;
    paylaod.serviceDate = new Date(paylaod.serviceDate);
    // if (paylaod.serviceDate < new Date()) {
    //   throw new AppError(
    //     400,
    //     "serviceDate",
    //     "Service date must be in the future"
    //   );
    // }
    paylaod.completionDate = null;
    const data = {
        bikeId: paylaod.bikeId,
        serviceDate: paylaod.serviceDate,
        description: paylaod.description,
        status: paylaod.status,
        completionDate: paylaod.completionDate,
    };
    const result = yield prisma_2.default.serviceRecord.create({
        data,
    });
    return result;
});
// fetch all services
const fetchAllServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_2.default.serviceRecord.findMany();
    return services;
});
// fetch single sercice by id
const fetchSingleServiceById = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_2.default.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    return service || null;
});
// update service by id.
const updateService_byID_intoDB = (serviceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_2.default.serviceRecord.findUnique({
        where: { serviceId },
    });
    if (!service) {
        throw new AppError_1.default(404, "serviceId", "Service not found");
    }
    if (service.status === "DONE") {
        throw new AppError_1.default(400, "serviceId", "Service already completed");
    }
    payload.completionDate = new Date(payload.completionDate || Date.now());
    if (payload.completionDate < service.serviceDate) {
        throw new AppError_1.default(400, "completionDate", "Completion date must be after service date");
    }
    const updateData = {
        status: prisma_1.ServiceStatus.DONE,
        completionDate: payload.completionDate,
    };
    const result = yield prisma_2.default.serviceRecord.update({
        where: { serviceId },
        data: updateData,
    });
    return result;
});
// fetch status of older then 7 days over due services.
const fetchOverDueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_2.default.serviceRecord.findMany({
        where: {
            serviceDate: {
                lte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
            OR: [
                { status: prisma_1.ServiceStatus.PENDING },
                { status: prisma_1.ServiceStatus.IN_PROGRESS },
            ],
        },
    });
    return services;
});
exports.ServiceServices = {
    createServiceIntoDB,
    fetchAllServicesFromDB,
    fetchSingleServiceById,
    updateService_byID_intoDB,
    fetchOverDueServices,
};
