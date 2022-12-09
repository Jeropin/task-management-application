const router = require('express').Router();

const task = require('../controllers/task');

// GET /tasks/priorities
router.get('/priorities', task.getTaskPriorities)

// GET /tasks/priorities
router.get('/statuses', task.getTaskStatuses)

// GET /tasks/:id
router.get('/:id', task.getTaskById);

// POST /tasks
router.post('/', task.addTask);

// PUT /tasks/:id
router.put('/:id', task.updateTask);

// DELETE /tasks/:id
router.delete('/:id', task.removeTask);

module.exports = router;
