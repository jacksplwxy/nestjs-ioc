import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import router from './core/router';


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);


app.listen(8080, () =>
  console.log('server is running at http://localhost:8080'),
);
