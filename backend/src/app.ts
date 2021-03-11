import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import router from './route/route'

// Fire the express
const app = express();

// Enable body-parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Enable cors middleware
app.use(cors());

// Enable router middleware
app.use(router);

// Enable compression, this compress every response body for all request
app.use(compression());

export default app;


