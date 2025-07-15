const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const usernameDB = "Admin123";
const passwordDB = "admin@@786";

// Set view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10000 } 
}));

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.username) {
    return next();
  }
  res.redirect('/');
}

// Routes

// Login Page
app.get('/', (req, res) => {
  const error = req.session.error;
  req.session.error = null; 
  res.render('login', { error });
});

// Login Validation
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === usernameDB && password === passwordDB) {
    req.session.username = username;
    res.redirect('/home');
  } else {
    req.session.error = "Invalid username or password.";
    res.redirect('/');
  }
});

// Home Page (Protected)
app.get('/home', isAuthenticated, (req, res) => {
  res.set('Cache-Control', 'no-store'); // Prevent caching
  res.render('home', { username: req.session.username });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Error logging out");
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
