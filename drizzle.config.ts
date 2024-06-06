import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    schema: "./src/domain/entities/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
});