const { app, PORT } = require('./config/config');
const { defaultRoute } = require('./route/route');


app.route('/')
  .get(defaultRoute);


app.listen(PORT);


module.exports = { app };
