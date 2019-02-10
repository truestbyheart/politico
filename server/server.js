const { app, PORT } = require('./config/config');
const {
  defaultRoute,
  postParty,
  getParties,
  getParty,
  editParty,
  deleteParty,
  postOffice,
  getOffices,
} = require('./route/route');


app.route('/')
  .get(defaultRoute);

app
  .route('/v1/parties')
  .post(postParty)
  .get(getParties);

app
  .route('/v1/parties/:id')
  .get(getParty)
  .patch(editParty)
  .delete(deleteParty);

app
  .route('/v1/offices')
  .post(postOffice)
  .get(getOffices);


app.listen(PORT);


module.exports = { app };
