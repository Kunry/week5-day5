const router = require('express').Router();
const { init } = require('../utils/create_template.util');
const sendEmail = require('../utils/nodemailer.util');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/sendEmail', (req, res, next) => {
  const { to, subject, description } = req.body;
  console.log(req.body);
  sendEmail(to, subject, init(description))
    .then((info) => {
      res.redirect('/');
    })
    .catch((err) => next(err));
});

module.exports = router;
