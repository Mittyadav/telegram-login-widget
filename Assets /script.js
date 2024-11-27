// Function to handle the Telegram Login Widget callback
function handleTelegramLogin(user) {
    if (user) {
        console.log("User logged in:", user);
        
        // You can make an API call to your server here
        fetch('https://mittyadav.github.io/telegram-login-widget/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            alert('Login successful! Welcome, ' + user.first_name);
        })
        .catch((error) => {
            console.error('Error during login:', error);
            alert('There was an error processing your login.');
        });
    } else {
        console.error("Login failed or user denied permissions.");
    }
}

// Dynamically load the Telegram Login Widget script
function loadTelegramWidget(botUsername) {
    const script = document.createElement('script');
    script.src = `https://telegram.org/js/telegram-widget.js?22`;
    script.async = true;
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-auth-url', 'https://mittyadav.github.io/telegram-login-widget/'); // Adjust to your server endpoint
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login-container').appendChild(script);
}

// Call the widget loading function with your bot's username
window.onload = function() {
    const botUsername = '@Testingmini0_bot'; // Replace with your bot's username
    loadTelegramWidget(botUsername);
};
