import Booking from "../models/book.model.js";

export const createBooking = async (req, res) => {
    try {
        const { user, terrain, startTime, endTime } = req.body;

        const newBooking = new Booking({ user, terrain, startTime, endTime });
        await newBooking.save();

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ user: userId }).populate("terrain");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
