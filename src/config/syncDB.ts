import { connectToDB } from '../data/db';

(async () => {
  await connectToDB(true);
})();
