const { app, PORT } = require('./config/config');
const { defaultRoute, postParty } = require('./route/route');


app.route('/')
  .get(defaultRoute);

app
  .route('/v1/parties')
  .post(postParty);

app.listen(PORT);


module.exports = { app };
