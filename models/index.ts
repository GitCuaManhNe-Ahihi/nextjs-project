import dotenv from "dotenv";
dotenv.config();

export const server = process.env.NODE_ENV !== "development" ? "https://nextjs-project-wine-seven.vercel.app" : "http://localhost:3000";
export * from './common';
export * from './auth';
export * from './post';
export * from './student';
