import express from 'express';
import cors from 'cors';

import config from './src/config.js';

import authRoute from './src/routes/authRoute.js';
import userRoute from './src/routes/userRoute.js';
import financialRoute from './src/routes/financialRoute.js';
import informationRoute from './src/routes/informationRoute.js';
import administrationRoute from './src/routes/administrationRoute.js';

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(authRoute);
app.use(userRoute);
app.use(financialRoute);
app.use(informationRoute);
app.use(administrationRoute);

app.listen(config.port, () =>
  console.log(`Server is live PORT:${config.hostUrl}`),
);

export default app;