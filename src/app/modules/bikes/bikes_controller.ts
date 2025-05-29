import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BikesServices } from "./bikes_service";

// create bike controller
const createBike = catchAsync(async (req, res) => {
  const result = await BikesServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Bike created successfully",
    data: result,
  });
});

// fetch all bikes
const fetchAllBikes = catchAsync(async (req, res) => {
  const result = await BikesServices.fetchAllBikesFromDB();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Bikes fetched successfully",
    data: result,
  });
});

// fetch single bike.
const fetchSingleBike = catchAsync(async (req, res) => {
  const result = await BikesServices.fetchSingleBikeByIdIntoDB(
    req.params.bikeId,
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Bike fetched successfully",
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  fetchAllBikes,
  fetchSingleBike,
};
