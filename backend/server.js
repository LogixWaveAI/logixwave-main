const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// --- IMPORTANT: Load Env Vars FIRST ---
dotenv.config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');
const memberRoutes = require('./routes/memberRoutes');
// AI Controller Import

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Isse browser uploaded images ko access kar payega
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MOUNT ROUTES ---
app.use('/api/auth', authRoutes); 
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/members', memberRoutes);



app.get('/', (req, res) => {
    res.send('KPCODETECH API is Running... 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});