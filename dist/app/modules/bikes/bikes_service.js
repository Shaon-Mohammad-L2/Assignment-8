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
exports.BikesServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
// create a bike into db.
const createBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUnique({
        where: { customerId: payload.customerId },
    });
    if (!customer) {
        throw new AppError_1.default(404, "customerId", "Customer id not found");
    }
    const data = {
        brand: payload.brand,
        model: payload.model,
        year: payload.year,
        customerId: payload.customerId,
    };
    const bike = yield prisma_1.default.bike.create({
        data,
    });
    return bike;
});
// fetch all bikes from db.
const fetchAllBikesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield prisma_1.default.bike.findMany({
        include: {
            customer: {
                select: {
                    name: true,
                    phone: true,
                    email: true,
                },
            },
        },
    });
    return bikes;
});
// fetch single bike by id
const fetchSingleBikeByIdIntoDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma_1.default.bike.findUnique({
        where: { bikeId },
        include: {
            customer: {
                select: {
                    name: true,
                    phone: true,
                    email: true,
                },
            },
        },
    });
    return bike || null;
});
exports.BikesServices = {
    createBikeIntoDB,
    fetchAllBikesFromDB,
    fetchSingleBikeByIdIntoDB,
};
