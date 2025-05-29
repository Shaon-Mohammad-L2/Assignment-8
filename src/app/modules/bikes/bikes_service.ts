import { Bike } from "../../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";

// create a bike into db.
const createBikeIntoDB = async (payload: Bike) => {
  const customer = await prisma.customer.findUnique({
    where: { customerId: payload.customerId },
  });
  if (!customer) {
    throw new AppError(404, "customerId", "Customer id not found");
  }
  const data = {
    brand: payload.brand,
    model: payload.model,
    year: payload.year,
    customerId: payload.customerId,
  };
  const bike = await prisma.bike.create({
    data,
  });
  return bike;
};

// fetch all bikes from db.
const fetchAllBikesFromDB = async () => {
  const bikes = await prisma.bike.findMany({
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
};

// fetch single bike by id
const fetchSingleBikeByIdIntoDB = async (bikeId: string) => {
  const bike = await prisma.bike.findUnique({
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
};

export const BikesServices = {
  createBikeIntoDB,
  fetchAllBikesFromDB,
  fetchSingleBikeByIdIntoDB,
};
