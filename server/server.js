const { app, PORT } = require('./config/config');
const { defaultRoute, postParty, getParties } = require('./route/route');


app.route('/')
  .get(defaultRoute);

app
  .route('/v1/parties')
  .post(postParty)
  .get(getParties);

app.listen(PORT);


module.exports = { app };
