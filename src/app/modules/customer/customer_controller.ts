import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CustomerServices } from "./customer_service";

// create customer controller
const createCustomer = catchAsync(async (req, res) => {
  const result = await CustomerServices.createCustomer(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

// get all customers controller
const fetchAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerServices.fetchAllCustomersFromDB();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Customers fetched successfully",
    data: result,
  });
});

// get single customer by id controller
const getSingleCustomerById = catchAsync(async (req, res) => {
  const result = await CustomerServices.fetchSingleCustomerByIdIntoDB(
    req.params.id
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Customer fetched successfully",
    data: result,
  });
});

// update customer by id controller
const updateCustomerById = catchAsync(async (req, res) => {
  const result = await CustomerServices.updateCustomerInfoIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});

// delete customer by id controller
const deleteCustomerById = catchAsync(async (req, res) => {
  const result = await CustomerServices.deleteCustomerIntoDB(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
});

export const CustomerControllers = {
  createCustomer,
  fetchAllCustomers,
  getSingleCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
