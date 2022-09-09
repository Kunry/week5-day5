module.exports = (app) => {
  // 👇 Start handling routes here
  const index = require('./index.routes');
  app.use('/', index);
  const user = require('./user.routes');
  app.use('/user', user);
};
