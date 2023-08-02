require('dotenv').config();
require('express-async-errors');

//socket modules
let express = require('express');
let connectDb = require('./utils/connect_db');

//express modules
let rateLimiter = require('express-rate-limit');
let cors = require('cors');
let helmet = require('helmet');
let xss_clean = require('xss-clean');
let mongoSanitize = require('express-mongo-sanitize');
let cookieParser = require('cookie-parser');

//middlewares
let authRouter = require('./routes/auth');
let userRouter = require('./routes/users');
let errorHandler = require('./middlewares/error_handler');
let pageNotFound = require('./middlewares/page_not_found');

//app instance
let app = express();

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs : 15 * 60 * 1000,
    max : 60
}));
app.use(cors({
    // origin: process.env.CLIENT
    origin: "*"
}));
app.use(helmet());
app.use(xss_clean());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/apis/v1/auth', authRouter);
app.use('/apis/v1/users', userRouter);
app.use(pageNotFound);
app.use(errorHandler);

//port---------------------------
let port = process.env.PORT || 5000

//start the app------------------
async function start() {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {
            return console.log(`server is listening on ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();