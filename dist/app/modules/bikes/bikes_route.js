"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bikes_validationZodSchema_1 = require("./bikes_validationZodSchema");
const bikes_controller_1 = require("./bikes_controller");
const router = express_1.default.Router();
// create bike.
router.post("/", (0, validateRequest_1.default)(bikes_validationZodSchema_1.BikeValidation.createBikeValidationZodSchema), bikes_controller_1.BikeControllers.createBike);
// fetch all bikes.
router.get("/", bikes_controller_1.BikeControllers.fetchAllBikes);
// fetch single bike by id.
router.get("/:bikeId", (0, validateRequest_1.default)(bikes_validationZodSchema_1.BikeValidation.getSingleBikeID_ValidationSchema), bikes_controller_1.BikeControllers.fetchSingleBike);
exports.BikeRoutes = router;
//
