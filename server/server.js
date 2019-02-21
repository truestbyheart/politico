import express from 'express';
import bodyParser from 'body-parser';
import partiesRouter from './route/parties';
import officesRouter from './route/offices';
import defaultRoute from './controller/default';
import login from './route/login';
import vote from './route/vote';
import candidate from './route/candidate';
import signupUser from './controller/signup';
import jwtverifier from './middleware/verify';
import isAdmin from './middleware/adminVerify';


export const app = express();
export const PORT = process.env.PORT || 3200;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1/parties/', jwtverifier, isAdmin, partiesRouter);
app.use('/api/v1/offices/', jwtverifier, isAdmin, officesRouter);
app.use('/api/v1/vote', jwtverifier, vote);
app.use('/api/v1/offices/', jwtverifier, isAdmin, candidate);
app.use('/api/v1/login/', login);
app.use('/api/v1/signup/', signupUser);
app.use('/', defaultRoute);


app.listen(PORT);


export default app;
