import path from 'path';
import express from 'express';

import client from './client';
import api from './api';

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../src/views'));

app.use('/api', api);

app.use(client);


app.listen(3000);
