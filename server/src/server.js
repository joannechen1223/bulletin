import express from 'express';
import api from './api';

const server = express();
server.use('/', api);

server.listen(3001, function () {
  console.log('Bulletin app listening on port 3001!');
});