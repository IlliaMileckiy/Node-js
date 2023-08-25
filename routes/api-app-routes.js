const express = require('express');
const router = express.Router();

const constructor = require('../controller/api-app-controller');

//get all List
router.get('/api/list', constructor.getList);
//Add new Task
router.post('/api/task', constructor.postAddTask);
//Delete Task by ID
router.delete('/api/task/:id', constructor.deleteTask);
//Update task by ID
router.put('/api/task/:id', constructor.putEditTask);

module.exports = router;