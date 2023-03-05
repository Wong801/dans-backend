import express from 'express';
import cors from 'cors';
import env from './config/env';
import loaders from './loaders';
import init from './api/middlewares/init';
import IAM from './api/modules/Iam';
import error from './api/middlewares/error';
import wrap from './api/middlewares/wrap';
import DataInterface from './models/DataInterface';
import client from './models/mongoInterface';

const app = express();

const corsDomain = env('CORS_DOMAIN', '').startsWith('/') ? new RegExp(env('CORS_DOMAIN', '')) : env('CORS_DOMAIN', '');

const corsOptions = corsDomain
  ? { origin: corsDomain, credentials: true } : undefined;
app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(init({
  modules: {
    iam: new IAM({ dataInterface: new DataInterface({ client }) }),
  },
})); (async () => {
  await loaders({ app });
})();

app.use(wrap());
app.use(error());

app.listen(env('PORT', 3000), () => {
  // eslint-disable-next-line no-console
  console.log('Started Listening...');
});
