import express, { Application, json } from 'express';
import cors from 'cors';

const app: Application = express();
app.use(
  cors(),
  json(),
);

export default app;
