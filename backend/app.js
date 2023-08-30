require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT, MONGODB_URI } = process.env;
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./utils/rateLimiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainRouter = require('./routes/index');

const app = express();
app.use(cors());

const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(rateLimiter);
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

app.use(mainRouter);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT);
