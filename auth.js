const urlParams = new URLSearchParams(window.location.search);
const queryId = urlParams.get('query_id');
const user = JSON.parse(decodeURIComponent(urlParams.get('user')));
const authDate = urlParams.get('auth_date');
const hash = urlParams.get('hash');

// Verify the data integrity by comparing the hash
function verifyHash(data, secret) {
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', secret)
                       .update(data)
                       .digest('hex');
    return hash === hash;
}

// Check if the hash is valid
const secret = 'YOUR_BOT_SECRET_KEY'; // Your bot's secret key
const dataToCheck = `${queryId}\n${authDate}\n${JSON.stringify(user)}`;
const valid = verifyHash(dataToCheck, secret);

if (valid) {
    // Process user data
    console.log("Authenticated user:", user);
    // Store the user data or proceed with the next steps.
} else {
    console.log("Invalid login attempt.");
}
