const router = require('express').Router();

const user = require('../controllers/user');

// GET /users
router.get('/', user.getUsers);

// GET /users/:id
router.get('/:id', user.updateUser);

// PUT /users/:id
router.put('/:id', user.updateUser);

// POST /users/:id
router.post('/', user.createUser);

module.exports = router;
