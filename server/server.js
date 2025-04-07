import express, { Router } from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import http from 'http'; // Import HTTP module to create server
import msgRouter from './routes/chat.routes.js';
import multer from 'multer';
import ownerRoutes from './routes/owner.routes.js'; // Import owner routes
import terrainRoutes from './routes/terrain.routes.js'; // Import terrain routes
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000; // Ensure default port if none in .env

const server = http.createServer(app); // Create HTTP server

// Middleware
app.use(express.json(), cors()); // Parse JSON requests

// Connect to the database
dbConnect();

// Routes
app.use('/api', authRoutes, Router, msgRouter); 
app.use('/api', ownerRoutes); // Ensure ownerRoutes is imported and used
app.use('/api', terrainRoutes);
app.use('/uploads', express.static('public/uploads'));
console.log(`you are On server side port: ${PORT}`);

const storage = multer.diskStorage({
    destination: function (_, __, cb) { // Removed unused parameters
        cb(null, 'public/uploads/');
    },
    filename: function (_, file, cb) { // Removed unused 'req' parameter
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('sticker'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    console.log(`File uploaded: ${req.file.filename}`);
    const filePath = req.file.path.replace('public/', '');
    res.status(200).json({ filePath }); // Ensure consistent JSON response
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
