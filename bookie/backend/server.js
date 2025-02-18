require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookverse', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ MongoDB Connection Error:'));
db.once('open', () => {
    console.log('✅ MongoDB Connected!');
});

// Book Schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    contactPhone: { type: String, required: true },
    images: [{ type: String }],
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes

// Test Route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

app.post('/api/books', upload.array('images', 3), async (req, res) => {
    try {
        // Extract form data
        const { title, author, genre, condition, description, price, contactPhone } = req.body;

        // Extract file paths for uploaded images
        const images = req.files.map(file => `/uploads/${file.filename}`);

        // Create a new book
        const newBook = new Book({
            title,
            author,
            genre,
            condition,
            description,
            price: parseFloat(price), // Ensure price is a number
            contactPhone,
            images,
        });

        // Save the book to the database
        await newBook.save();
        res.status(201).json({ message: 'Book listed successfully!', book: newBook });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get All Books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});