require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle Telegram Login Widget data
app.post('/telegram-login', (req, res) => {
    const user = req.body;

    if (!user) {
        return res.status(400).send({ success: false, message: 'Invalid user data.' });
    }

    // Verify the user's data integrity
    const token = process.env.BOT_TOKEN;
    const secretKey = crypto.createHash('sha256').update(token).digest();

    const checkString = Object.keys(user)
        .filter((key) => key !== 'hash')
        .sort()
        .map((key) => `${key}=${user[key]}`)
        .join('\n');

    const hash = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

    if (hash !== user.hash) {
        return res.status(403).send({ success: false, message: 'Data verification failed.' });
    }

    // Process the user data (e.g., create a session, save to database)
    console.log('User data verified:', user);

    // Send response back to the client
    res.send({ success: true, message: 'Login successful!', user });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
