import express from 'express';
import cors from 'cors';

import config from './config.js';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import financialRoute from './routes/financialRoute.js';
import informationRoute from './routes/informationRoute.js';
import administrationRoute from './routes/administrationRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use(userRoute);
app.use(financialRoute);
app.use(informationRoute);
app.use(administrationRoute);

app.listen(config.port, () =>
  console.log(`Server is live PORT:${config.hostUrl}`),
);