// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const { dbConfig, pool } = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Body Parser Middleware to parse incoming request data
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual frontend URL
}));

// Function to create a new user in the database
async function createUser(name, email, hashedPassword) {
  try {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, e_balance
    `;

    const newUser = await pool.query(query, [name, email, hashedPassword]);
    return newUser.rows[0];
  } catch (error) {
    if (error.constraint === 'users_email_key') {
      throw new Error('User with this email already exists. Please try with another email.');
    }
    throw error;
  }
}

// Endpoint to handle user registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user data into the database
    const newUser = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    if (error.message.startsWith('User with this email already exists')) {
      res.status(409).json({ error: error.message }); // 409 Conflict status for duplicate entry
    } else {
    res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
