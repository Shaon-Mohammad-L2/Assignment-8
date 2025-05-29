import { Customer } from "../../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "./../../shared/prisma";

// create customer into db
const createCustomer = async (payload: Customer) => {
  const exist = await prisma.customer.findUnique({
    where: { email: payload.email },
  });
  if (exist) {
    throw new AppError(400, "email", "Customer already exists with this email");
  }
  const data = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  };

  const result = await prisma.customer.create({
    data,
  });

  return result;
};

// fetch all customer from db.
const fetchAllCustomersFromDB = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

// fetch single customer by id
const fetchSingleCustomerByIdIntoDB = async (customerId: string) => {
  const customer = await prisma.customer.findUnique({
    where: { customerId },
  });
  return customer || null;
};

// update customer information.
const updateCustomerInfoIntoDB = async (
  customerId: string,
  payload: Partial<Customer>,
) => {
  if (payload.email) {
    throw new AppError(400, "email", "You can not change email");
  }
  if (payload.customerId) {
    throw new AppError(400, "customerId", "You can not change customerId");
  }
  if (payload.createdAt || payload.updatedAt) {
    throw new AppError(400, "", "You can not change createdAt or updatedAt");
  }
  const customer = await prisma.customer.findUnique({
    where: { customerId },
  });
  if (!customer) {
    throw new AppError(404, "id", "Customer Not found");
  }
  const result = await prisma.customer.update({
    where: { customerId },
    data: payload,
  });
  return result;
};

// customer deelte into db.
const deleteCustomerIntoDB = async (customerId: string) => {
  const extCustomer = await prisma.customer.findUnique({
    where: { customerId },
  });
  if (!extCustomer) {
    throw new AppError(404, "id", "Customer Not found");
  }

  try {
    await prisma.$transaction(async (transactionClient) => {
      const bikes = await transactionClient.bike.findMany({
        where: { customerId },
        select: { bikeId: true },
      });

      const bikeIds = bikes.map((b) => b.bikeId);

      await transactionClient.serviceRecord.deleteMany({
        where: {
          bikeId: {
            in: bikeIds,
          },
        },
      });

      await transactionClient.bike.deleteMany({
        where: { customerId },
      });

      await transactionClient.customer.delete({
        where: { customerId },
      });
    });

    return { message: "Customer All Records deleted successfully" };
  } catch (err) {
    throw new AppError(400, "", "Error deleting customer records");
  }
};
export const CustomerServices = {
  createCustomer,
  fetchAllCustomersFromDB,
  fetchSingleCustomerByIdIntoDB,
  updateCustomerInfoIntoDB,
  deleteCustomerIntoDB,
};
