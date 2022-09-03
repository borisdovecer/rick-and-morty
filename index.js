const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const db = require('./config/db');

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();
const port = 8080;

app.use(cookieParser('mySecretKey'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
