import express from 'express';
import bodyParser from 'body-parser';
import {
  defaultRoute, postParty, getParties, getParty, editParty,
} from './route/route';

export const app = express();
export const PORT = process.env.PORT || 3200;
app.use(bodyParser.json());


app.route('/')
  .get(defaultRoute);

app
  .route('/v1/parties')
  .post(postParty)
  .get(getParties);

app
  .route('/v1/parties/:id')
  .get(getParty)
  .patch(editParty);


app.listen(PORT);


export default app;
