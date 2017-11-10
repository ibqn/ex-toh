import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';
import api from './routes/api';
import initDb from './db';


const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

initDb()

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    result: `Express js is running on port ${config.port}`
  });
});

app.use('/api', api);

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
