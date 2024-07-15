import { defineConfig, devices } from '@playwright/test';
import { config } from "dotenv";

config();

export default defineConfig({
  use: {
    baseURL: process.env.API_URL,
    ignoreHTTPSErrors: true,
    trace: "on",
  },
  testDir: './playwright',
  fullyParallel: true,
  retries: 0,
  reporter: [["list"], ["html"]],
});
