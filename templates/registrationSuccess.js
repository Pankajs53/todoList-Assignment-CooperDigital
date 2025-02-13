exports.registrationSuccessEmail = (email, firstname) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                background-color: #f4f4f4;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin: auto;
            }
            h1 {
                color: #4CAF50;
            }
            p {
                color: #333;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to ToDoList App!</h1>
            <p>Dear ${firstname},</p>
            <p>Your account has been successfully registered with the email: ${email}.</p>
            <p>Start organizing your tasks now by logging in.</p>
            <a href="https://yourapp.com/login" class="button">Login Now</a>
        </div>
    </body>
    </html>`;
};