import "dotenv/config";
import { z } from "zod";

// Define the environment variables schema
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
});

// Parse the environment variables
const env = envSchema.parse(process.env);

export default env;
