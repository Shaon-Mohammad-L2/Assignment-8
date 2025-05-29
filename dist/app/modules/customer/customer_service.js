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
exports.CustomerServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("./../../shared/prisma"));
// create customer into db
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.default.customer.findUnique({
        where: { email: payload.email },
    });
    if (exist) {
        throw new AppError_1.default(400, "email", "Customer already exists with this email");
    }
    const data = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
    };
    const result = yield prisma_1.default.customer.create({
        data,
    });
    return result;
});
// fetch all customer from db.
const fetchAllCustomersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield prisma_1.default.customer.findMany();
    return customers;
});
// fetch single customer by id
const fetchSingleCustomerByIdIntoDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUnique({
        where: { customerId },
    });
    return customer || null;
});
// update customer information.
const updateCustomerInfoIntoDB = (customerId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.email) {
        throw new AppError_1.default(400, "email", "You can not change email");
    }
    if (payload.customerId) {
        throw new AppError_1.default(400, "customerId", "You can not change customerId");
    }
    if (payload.createdAt || payload.updatedAt) {
        throw new AppError_1.default(400, "", "You can not change createdAt or updatedAt");
    }
    const customer = yield prisma_1.default.customer.findUnique({
        where: { customerId },
    });
    if (!customer) {
        throw new AppError_1.default(404, "id", "Customer Not found");
    }
    const result = yield prisma_1.default.customer.update({
        where: { customerId },
        data: payload,
    });
    return result;
});
// customer deelte into db.
const deleteCustomerIntoDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const extCustomer = yield prisma_1.default.customer.findUnique({
        where: { customerId },
    });
    if (!extCustomer) {
        throw new AppError_1.default(404, "id", "Customer Not found");
    }
    try {
        yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const bikes = yield transactionClient.bike.findMany({
                where: { customerId },
                select: { bikeId: true },
            });
            const bikeIds = bikes.map((b) => b.bikeId);
            yield transactionClient.serviceRecord.deleteMany({
                where: {
                    bikeId: {
                        in: bikeIds,
                    },
                },
            });
            yield transactionClient.bike.deleteMany({
                where: { customerId },
            });
            yield transactionClient.customer.delete({
                where: { customerId },
            });
        }));
        return { message: "Customer All Records deleted successfully" };
    }
    catch (err) {
        throw new AppError_1.default(400, "", "Error deleting customer records");
    }
});
exports.CustomerServices = {
    createCustomer,
    fetchAllCustomersFromDB,
    fetchSingleCustomerByIdIntoDB,
    updateCustomerInfoIntoDB,
    deleteCustomerIntoDB,
};
