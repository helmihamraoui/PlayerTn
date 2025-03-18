import mongoose from 'mongoose';

const OwnerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        businessName: {
            type: String,
            required: [true, "Business name is required"],
        },
        businessAddress: {
            type: String,
            required: [true, "Business address is required"],
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            match: [
                /^[0-9]{10}$/, 
                "Please enter a valid contact number",
            ],
        },
        profilePicture: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false, 
        },
        terrains: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Terrain',  // Array of references to the Terrain model
        }],
    },
    { timestamps: true }
);

export default mongoose.model('Owner', OwnerSchema);
