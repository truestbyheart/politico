import express from 'express';
import bodyParser from 'body-parser';
import partiesRouter from './route/parties';
import officesRouter from './route/offices';
import defaultRoute from './controller/default';
import login from './route/login';


export const app = express();
export const PORT = process.env.PORT || 3200;
app.use(bodyParser.json());

app.use('/api/v1/parties/', partiesRouter);
app.use('/api/v1/offices/', officesRouter);
app.use('/api/v1/login/', login);
app.use('/', defaultRoute);


app.listen(PORT);


export default app;
