const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    title: {
        type: String,
        requires: true
    },
    text: {
        type: String,
        required: true
    }
});
const Task = mongoose.model("Task", task);

module.exports = Task;