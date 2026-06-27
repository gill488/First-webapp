const express = require('express');
const app = express();
const port = 3000;

// Backend Middleware: Yeh incoming JSON aur Form data ko read karne ke liye lazmi hai
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Database: Real database (like MongoDB/MySQL) ki jagah abhi hum data yahan save karenge
let contactSubmissions = [
    { id: 1, name: "Tayyab Nawaz", email: "tayyab@example.com", message: "DevOps pipeline is working great!" }
];

// 1. FRONTEND ROUTE: Yeh user ko main page dikhaye ga (With Interactive Form)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Azure Production Backend App</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
            body { background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
            .container { background: #1e293b; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-width: 600px; width: 100%; border: 1px solid #334155; }
            h1 { font-size: 1.8rem; margin-bottom: 1rem; color: #fff; text-align: center; }
            p { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem; text-align: center; }
            form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
            label { font-size: 0.875rem; color: #cbd5e1; font-weight: 600; }
            input, textarea { background: #0f172a; border: 1px solid #475569; padding: 0.75rem; border-radius: 8px; color: #fff; font-size: 1rem; width: 100%; }
            input:focus, textarea:focus { border-color: #38bdf8; outline: none; }
            button { background: #0ea5e9; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem; transition: background 0.2s; }
            button:hover { background: #0284c7; }
            .api-box { background: #0f172a; padding: 1rem; border-radius: 8px; border: 1px solid #334155; }
            .api-title { font-size: 0.85rem; color: #38bdf8; font-weight: bold; margin-bottom: 0.5rem; text-transform: uppercase; }
            a { color: #38bdf8; text-decoration: none; font-weight: 600; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Azure Backend App Active</h1>
            <p>Enter details below to test the live Node.js Backend API processing.</p>
            
            <form action="/api/contact" method="POST">
                <div>
                    <label>Your Name</label>
                    <input type="text" name="name" required placeholder="e.g. Tayyab">
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="email" name="email" required placeholder="name@example.com">
                </div>
                <div>
                    <label>Message</label>
                    <textarea name="message" rows="3" required placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit">Submit to Backend</button>
            </form>

            <div class="api-box">
                <div class="api-title">Live Backend Data Endpoint</div>
                <p style="text-align: left; margin-bottom: 0.5rem; font-size: 0.9rem;">
                    You can view all submitted data in raw JSON format here:
                </p>
                <a href="/api/submissions" target="_blank">View /api/submissions</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// 2. BACKEND API ROUTE (POST): Form ka data receive karne ke liye
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Data validation
    if (!name || !email || !message) {
        return res.status(400).send("All fields are required!");
    }

    // Creating a new record object
    const newSubmission = {
        id: contactSubmissions.length + 1,
        name: name,
        email: email,
        message: message,
        timestamp: new Date()
    };

    // Pushing into our local array (Saving data)
    contactSubmissions.push(newSubmission);

    // Form submit hone ke baad response dikhana
    res.send(`
        <div style="background: #0f172a; color: #fff; font-family: sans-serif; text-align: center; padding: 50px;">
            <h2 style="color: #10b981;">✓ Data Processed Successfully by Backend!</h2>
            <p style="color: #94a3b8; margin: 20px 0;">Name: ${name} | Email: ${email}</p>
            <a href="/" style="color: #38bdf8; text-decoration: none; font-weight: bold;">← Go Back</a>
        </div>
    `);
});

// 3. BACKEND API ROUTE (GET): Saved submissions ka data fetch karne ke liye
app.get('/api/submissions', (req, res) => {
    res.json(contactSubmissions);
});

app.listen(port, () => {
    console.log(`Backend application is listening on port ${port}`);
});
