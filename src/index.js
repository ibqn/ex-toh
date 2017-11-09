import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';


const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));


app.use(bodyParser.json({
	limit: config.bodyLimit
}));

app.get('/', (req, res) => {
  res.send(`Express js is running on port ${config.port}`);
});

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
