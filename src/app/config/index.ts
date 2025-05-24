import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV || "production",
  port: process.env.PORT || 5000,
  postgres_database_url: process.env.DATABASE_URL,
};
