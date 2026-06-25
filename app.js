const express = require('express');
const app = express();
const port = 3000;

// Simple custom dashboard UI built straight into the response
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Production Cloud Deployment</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            body {
                background: #0f172a;
                color: #f8fafc;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container {
                background: #1e293b;
                padding: 3rem;
                border-radius: 16px;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
                text-align: center;
                max-width: 500px;
                width: 90%;
                border: 1px solid #334155;
            }
            .status-badge {
                background: rgba(16, 185, 129, 0.1);
                color: #10b981;
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                border: 1px solid rgba(16, 185, 129, 0.2);
            }
            .status-dot {
                width: 8px;
                height: 8px;
                background: #10b981;
                border-radius: 50%;
                box-shadow: 0 0 8px #10b981;
            }
            h1 {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: #ffffff;
            }
            p {
                color: #94a3b8;
                font-size: 1rem;
                line-height: 1.5;
                margin-bottom: 2rem;
            }
            .tech-stack {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 1rem;
                padding-top: 1.5rem;
                border-top: 1px solid #334155;
            }
            .tech-item {
                background: #0f172a;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.75rem;
                font-weight: 600;
                color: #38bdf8;
                border: 1px solid #1e293b;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="status-badge">
                <div class="status-dot"></div>
                Production Active
            </div>
            <h1>Deployment Successful!</h1>
            <p>Your automated CI/CD pipeline has successfully built, shipped, and deployed this container application directly to Microsoft Azure.</p>
            
            <div class="tech-stack">
                <span class="tech-item">Docker</span>
                <span class="tech-item">GitHub Actions</span>
                <span class="tech-item">Azure VM</span>
                <span class="tech-item">Node.js</span>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Health check endpoint (Great for DevOps presentation)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(port, () => {
    console.log(`Application running smoothly on port ${port}`);
});
