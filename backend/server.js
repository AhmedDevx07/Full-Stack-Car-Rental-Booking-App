import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import dns from "dns";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
// Initialize Express App
const app = express();

// Connect Database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
