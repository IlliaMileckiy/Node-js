const express = require('express');
const router = express.Router();

const constructor = require('../controller/app-controller');

router.get('/', constructor.getIndex);
router.get('/list', constructor.getList);
router.get('/add-task', constructor.getAddTask);
router.post('/add-task', constructor.postAddTask);
router.delete('/list/:id', constructor.deleteTask);
router.get('/edit/:id', constructor.getEditTask);
router.post('/edit/:id', constructor.postEditTask);

module.exports = router;