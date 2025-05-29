import { ServiceRecord, ServiceStatus } from "../../../../generated/prisma";
import AppError from "../../errors/AppError";
import prisma from "../../shared/prisma";

// create a service
const createServiceIntoDB = async (paylaod: ServiceRecord) => {
  const bike = await prisma.bike.findUnique({
    where: {
      bikeId: paylaod.bikeId,
    },
  });
  if (!bike) {
    throw new AppError(404, "bikeId", "Bike not found");
  }

  // allow payload.

  paylaod.status = ServiceStatus.PENDING;
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

  const result = await prisma.serviceRecord.create({
    data,
  });
  return result;
};

// fetch all services
const fetchAllServicesFromDB = async () => {
  const services = await prisma.serviceRecord.findMany();

  return services;
};

// fetch single sercice by id
const fetchSingleServiceById = async (serviceId: string) => {
  const service = await prisma.serviceRecord.findUnique({
    where: {
      serviceId,
    },
  });

  return service || null;
};

// update service by id.
const updateService_byID_intoDB = async (
  serviceId: string,
  payload: Partial<ServiceRecord>
) => {
  const service = await prisma.serviceRecord.findUnique({
    where: { serviceId },
  });
  if (!service) {
    throw new AppError(404, "serviceId", "Service not found");
  }
  if (service.status === "DONE") {
    throw new AppError(400, "serviceId", "Service already completed");
  }
  payload.completionDate = new Date(payload.completionDate || Date.now());

  if (payload.completionDate < service.serviceDate) {
    throw new AppError(
      400,
      "completionDate",
      "Completion date must be after service date"
    );
  }
  const updateData = {
    status: ServiceStatus.DONE,
    completionDate: payload.completionDate,
  };
  const result = await prisma.serviceRecord.update({
    where: { serviceId },
    data: updateData,
  });

  return result;
};

// fetch status of older then 7 days over due services.
const fetchOverDueServices = async () => {
  const services = await prisma.serviceRecord.findMany({
    where: {
      serviceDate: {
        lte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      OR: [
        { status: ServiceStatus.PENDING },
        { status: ServiceStatus.IN_PROGRESS },
      ],
    },
  });

  return services;
};

export const ServiceServices = {
  createServiceIntoDB,
  fetchAllServicesFromDB,
  fetchSingleServiceById,
  updateService_byID_intoDB,
  fetchOverDueServices,
};
