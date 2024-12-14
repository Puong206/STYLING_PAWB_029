const express = require('express');
const app = express();

// ...existing code...

// Serve static files from public directory
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

// ...existing code...
