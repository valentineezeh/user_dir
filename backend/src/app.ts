import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';

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

// Enable compression, this compress every response body for all request
app.use(compression());

const API_VERSION = '/v1';

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'User_dir is now running here'
  })
});

export default app;


