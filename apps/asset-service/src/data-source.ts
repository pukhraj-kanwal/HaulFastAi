import "reflect-metadata"; // Required for TypeORM
import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // WARNING: synchronize: true is for development only - do not use in production
    logging: false, // Set to true to see SQL logs
    entities: [], // Array of entity classes - will be added later
    migrations: [], // Array of migration classes - will be added later
    subscribers: [], // Array of subscriber classes - will be added later
});

// Function to initialize the database connection
export const initializeDataSource = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        throw err; // Re-throw the error to indicate failure
    }
};