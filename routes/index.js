module.exports = (app) => {
  // 👇 Start handling routes here
  const raiz = require('./index.routes');
  app.use('/', raiz);
  const user = require('./user.routes');
  app.use('/user', user);
};
