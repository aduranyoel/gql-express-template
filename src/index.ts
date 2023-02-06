import dotenv from 'dotenv';
import app from './application/server';
import { connectToDB } from './data/db';
import { startGqlServer } from './graphql/server';

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {

  await connectToDB();
  await startGqlServer(app);

  app.listen(PORT, () => console.log('app running on port', PORT));
})();
