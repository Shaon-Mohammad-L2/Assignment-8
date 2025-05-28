import express from "express";
import { CustomerRoutes } from "../modules/customer/customer_route";
import { BikeRoutes } from "../modules/bikes/bikes_route";

const routers = express.Router();

const moduleRoutes = [
  {
    path: "/customers",
    route: CustomerRoutes,
  },
  {
    path: "/bikes",
    route: BikeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  routers.use(route.path, route.route);
});

export default routers;
