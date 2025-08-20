import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
