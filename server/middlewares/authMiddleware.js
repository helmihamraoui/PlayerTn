import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticateToken = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];  // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access. No token provided." });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;  // Store the user in the request object
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default authenticateToken;