"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_route_1 = require("../modules/customer/customer_route");
const routers = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/customers",
        route: customer_route_1.CustomerRoutes,
    },
];
moduleRoutes.forEach((route) => {
    routers.use(route.path, route.route);
});
exports.default = routers;
