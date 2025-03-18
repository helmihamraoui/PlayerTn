import mongoose from 'mongoose';

const TerrainSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',  // Reference to the Owner who owns this terrain
            required: true,
        },
        name: {
            type: String,
            required: [true, "Terrain name is required"],
        },
        location: {
            type: String,
            required: [true, "Terrain location is required"],
        },
        size: {
            type: String,
            required: [true, "Terrain size is required"], // e.g., Small, Medium, Large
        },
        availability: {
            type: Boolean,
            // Whether the terrain is available or not
        },
        pricePerMorning: {
            type: Number,
            required: [true, "Price per morning is required"],
        },
        pricePerNight: {
            type: Number,
            required: [true, "Price per night is required"],
        },
        picture: {
            type: String,
            required: false,  // Optional image URL for the terrain
        },
    },
    { timestamps: true }
);

export default mongoose.model('Terrain', TerrainSchema);
