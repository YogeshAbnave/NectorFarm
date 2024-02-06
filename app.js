const express = require('express');
const app = express();

const cors = require('cors');

const mongoose = require('mongoose');
const path = require('path');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('express').Router();


if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == undefined) {
    require("dotenv").config({ path: "config/dev.env" });
} else if (process.env.NODE_ENV == 'staging') {
    require("dotenv").config({ path: "config/qa.env" });
} else if (process.env.NODE_ENV == 'production') {
    require("dotenv").config({ path: "config/prod.env" });
} else {
    require("dotenv").config({ path: "config/local.env" });
}

const port = process.env.PORT || 3000
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static('public'));

/***************Mongodb configuratrion********************/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true }).then(result => {
    console.log("DB is connected.", process.env.MONGO_URI);
});

mongoose.set('runValidators', true);

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// routes ======================================================================
app.use('/api', require('./app/routes/routes.js')); // load our routes and pass in our app and fully configured passport

app.use(express.static(path.join(__dirname, '/angularApp/dist')));
app.use(express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'angularApp/dist/index.html'));
});

// launch ======================================================================
const http = require('http');
const server = http.createServer(app);
server.listen(port);
console.log('Server is up and listening on port ==========> ' + port);
// pass the server to the socket
app.locals.options = {};
// Cron jobs


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
exports = module.exports = app, routes;
