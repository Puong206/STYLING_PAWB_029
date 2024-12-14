require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();
const port = 5050;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', './views');

// Define routes
app.get('/login', controllers.login.login);
app.post('/login/auth', controllers.login.loginAuth);
app.get('/register', controllers.register.formRegister);
app.post('/register/save', controllers.register.saveRegister);
app.get('/profile', controllers.profile.profile);
app.get('/contact', controllers.contact.getContact);
app.get('/contact/add', controllers.contact.formContact);
app.post('/contact/save', controllers.contact.saveContact);
app.get('/contact/edit/:id', controllers.contact.editContact);
app.post('/contact/update/:id', controllers.contact.updateContact);
app.get('/contact/delete/:id', controllers.contact.deleteContact);
app.get('/', controllers.home.home);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
