import express from 'express';

import IndexRouter from './routes/index';

import { databaseService } from './utils/database';

import errorHandler from './utils/middlewares/error.handler';

// Create Express server
const app: express.Express = express();

// ensure db connection
databaseService.authenticate();

app.set('port', process.env.PORT || 8081);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', IndexRouter);

// Generic Error Handler
app.use(errorHandler);

export default app;
