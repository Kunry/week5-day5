const multerMiddleware = require('../middleware/multer.middleware');
const UserModel = require('../models/User.model');

const router = require('express').Router();

router.get('/', (req, res, next) => {
  UserModel.find().then((users) => {
    res.render('users', { users });
  });
});

router.get('/create', (req, res, next) => {
  res.render('create-user');
});

router.get('/:id', (req, res, next) => {
  UserModel.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.render('edit-user', user);
      } else {
        res.render('not-found');
      }
    })
    .catch((err) => next(err));
});

router.post('/', multerMiddleware.single('photo'), (req, res, next) => {
  const { username } = req.body;
  let image = undefined;
  if (req.file && req.file.path) {
    image = req.file.path
  }
  UserModel.create({ username, avatar: image })
    .then((user) => {
      res.redirect('/user');
    })
    .catch((err) => next(err));
});

router.post('/:id', multerMiddleware.single('avatar'), (req, res, next) => {
  const { username, existingImage } = req.body;
  let image = '';

  if (req.file && req.file.path) {
    image = req.file.path;
  } else {
    image = existingImage;
  }

  UserModel.findByIdAndUpdate(req.params.id, { username, avatar: image })
    .then((user) => {
      res.redirect('/user');
    })
    .catch((err) => next(err));
});

module.exports = router;
