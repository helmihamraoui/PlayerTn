import express from 'express';
import { registerUser, loginUser, updateUser, verifyToken, logoutUser, getAllUsers, getAllUsersAdmin, deleteUserAdmin, countAllUsersAdmin, getUserById } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authMiddleware.js'; // Assuming you have authentication middleware

const router = express.Router();

// Register a new user
router.post('/register', registerUser);
// Login a user
router.post('/login', loginUser);
// Update user data (protected route)
router.put('/users/:id', authenticateToken, updateUser);
// Get all users 
router.get('/users', authenticateToken, getAllUsers);

router.get('/admin', authenticateToken, getAllUsersAdmin);
// Verify a token (protected route)
router.get('/verify', authenticateToken, verifyToken);
// Logout a user (client-side action)
router.post('/logout', logoutUser);

// Route to get a user by ID
router.get('/users/:id', authenticateToken, getUserById);


// Admin check middleware
const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
// Route to delete a user (admin only)
router.delete('/users/:id', authenticateToken, checkAdmin, deleteUserAdmin);





export default router;