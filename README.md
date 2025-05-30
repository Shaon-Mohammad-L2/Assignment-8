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
