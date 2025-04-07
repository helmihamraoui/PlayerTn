import express, { Router } from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import http from 'http'; // Import HTTP module to create server
import msgRouter from './routes/chat.routes.js';
import multer from 'multer';
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000; // Ensure default port if none in .env

const server = http.createServer(app); // Create HTTP server

// Middleware
app.use(express.json(), cors()); // Parse JSON requests

// Connect to the database
dbConnect();

// Routes
app.use('/api', authRoutes, Router, msgRouter); // Authentication, Recipe, and Chat routes

app.use('/uploads', express.static('public/uploads'));
console.log(`you are On server side port: ${PORT}`);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('sticker'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(`File uploaded: ${req.file.filename}`);
    const filePath = req.file.path.replace('public/', '');
    res.status(200).send({ filePath });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
