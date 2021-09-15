import express from 'express';
import cors from 'cors';
import db from './database/db';

const app = express();
const port = 8080;

db();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cors());
console.log(db);
app.listen(port, async () =>
  console.log(`Listening at http://localhost:${port}`)
);
