const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'src/views')); // Ensure the correct path to views
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(flash());

// Routes
const homeController = require('./src/controllers/controller-home');
const contactController = require('./src/controllers/controller-contact');
const appController = require('./src/controllers/controller-app');
const profileController = require('./src/controllers/controller-profile');

app.get('/', homeController.home);
app.get('/contact', contactController.getContacts);
app.get('/contact/add', contactController.formContact);
app.post('/contact/save', contactController.saveContact);
app.get('/contact/edit/:id', contactController.editContact);
app.post('/contact/update/:id', contactController.updateContact);
app.get('/contact/delete/:id', contactController.deleteContact);

app.get('/app', appController.getApp);
app.get('/app/add', appController.formApp);
app.post('/app/save', appController.saveApp);
app.get('/app/edit/:id', appController.editApp);
app.post('/app/update/:id', appController.updateApp);
app.get('/app/delete/:id', appController.deleteApp);

app.get('/profile', profileController.profile);

// Start server
app.listen(5050, () => {
  console.log('Server running on http://localhost:5050');
});
