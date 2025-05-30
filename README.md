# Bike Servicing Management API

## Project Summary

A backend API for managing customers, bikes, and service records at a bike servicing center. Built with Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL, the system supports full CRUD operations, job assignment, completion workflows, and overdue-service alerts.

## Live Backend Link

[View the deployed API here](https://assignment-8-bice.vercel.app)

## Github Repository

[View the repository code here](https://github.com/Shaon-Mohammad-L2/Assignment-8)

## Tech Stack

* **Runtime:** Node.js
* **Web Framework:** Express.js
* **Language:** TypeScript
* **ORM:** Prisma
* **Database:** PostgreSQL
* **Linting & Formatting:** ESLint, Prettier
* **Environment Management:** dotenv
* **Error Handling:** Zod

## Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shaon-Mohammad-L2/Assignment-8
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Environment variables**

   * Create `.env` File
   * Set the following:

     ```ini
     NODE_ENV=production or development
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
     PORT=5000
     ```
4. **Database migrations**

   ```bash
   npx prisma migrate dev 
   ```
5. **Start the server**

   ```bash
   npm run dev
   ```

   The API will run at `http://localhost:5000` by default.

## Key Features

* **Customer Management**

  * **Create Customer** (`POST /api/customers`)

    * **Request Body**

      ```json
      {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "123-456-7890"
      }
      ```
    * **Response (201 Created)**

  * **Get All Customers** (`GET /api/customers`)

    * **Response (200 OK)**


  * **Get Customer by ID** (`GET /api/customers/:customerId`)

    * **Response (200 OK)**

  * **Delete Customer** (`DELETE /api/customers/:customerId`)

    * **Response (200 OK)**

* **Bike Management**

  * **Add Bike** (`POST /api/bikes`)

    * **Request Body**

      ```json
      {
        "brand": "Yamaha",
        "model": "R15",
        "year": 2024,
        "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
      }
      ```
    * **Response (201 Created)**

  * **Get All Bikes** (`GET /api/bikes`)

    * **Response (200 OK)**

  * **Get Bike by ID** (`GET /api/bikes/:bikeId`)

    * **Response (200 OK)**

* **Service Record Management**

  * **Create Service** (`POST /api/services`)

    * **Request Body**

      ```json
      {
        "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
        "serviceDate": "2025-05-30T10:00:00.000Z",
        "description": "Oil change"
      }
      ```
    * **Response (201 Created)**

  * **Get All Services** (`GET /api/services`)

    * **Response (200 OK)**

  * **Get Service by ID** (`GET /api/services/:serviceId`)

    * **Response (200 OK)**

  * **Complete Service** (`PUT /api/services/:serviceId/complete`)

    * **Request Body (optional)**

      ```json
      { "completionDate": "2025-06-11T15:30:00.000Z" }
      ```
    * **Response (200 OK)**

* **Overdue & Pending Services**

  * **Get Pending/Overdue** (`GET /api/services/status`)

    * **Response (200 OK)**

* **Error Handling**

  * Standardized error response:

    ```json
    {
    "status": 404,
    "success": false,
    "message": "Customer Not found",
    "error": [
        {
            "path": "id",
            "message": "Customer Not found"
        }
    ],
    "stack": null
    }
    ```
