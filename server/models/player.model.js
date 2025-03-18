import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Reference to the User model
            required: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
            match: [
                /^[0-9]{10}$/, // Simple validation for a 10-digit phone number
                "Please enter a valid phone number",
            ],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"],
        },
        profilePicture: {
            type: String,
            required: false,  // Optional field for the player's profile picture
        },
        bio: {
            type: String,
            required: false,  // Optional field for the player's bio
        },
        rating: {
            type: Number,
            required: false,  // Optional field for the player's rating
            min: 0,
            max: 5,
        },
        // Add any other player-specific fields you need
    },
    { timestamps: true }
);

export default mongoose.model('Player', PlayerSchema);
