import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // User who is booking the terrain
            required: [true, "User is required"],
        },
        terrain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Terrain',  // The terrain being booked
            required: [true, "Terrain is required"],
        },
        startTime: {
            type: Date,
            required: [true, "Start time is required"],
        },
        endTime: {
            type: Date,
            required: [true, "End time is required"],
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',  // Default status can be 'pending'
        },
    },
    { timestamps: true }
);

export default mongoose.model('Booking', BookingSchema);
