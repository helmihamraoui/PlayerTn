import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings/:userId", getUserBookings);

export default router;
