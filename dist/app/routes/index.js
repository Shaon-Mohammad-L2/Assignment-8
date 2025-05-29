"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_route_1 = require("../modules/customer/customer_route");
const bikes_route_1 = require("../modules/bikes/bikes_route");
const service_route_1 = require("../modules/service/service_route");
const routers = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/customers",
        route: customer_route_1.CustomerRoutes,
    },
    {
        path: "/bikes",
        route: bikes_route_1.BikeRoutes,
    },
    {
        path: "/services",
        route: service_route_1.ServiceRoutes,
    },
];
moduleRoutes.forEach((route) => {
    routers.use(route.path, route.route);
});
exports.default = routers;
