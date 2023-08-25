const Task = require('../models/task-model');
const {json} = require("express");

const handleError = (res, error) => {
    res.status(500).json(error.message);
}

const objData = {
    idTask: undefined,
}

class constructor {
    postAddTask = (req, res) => {
        try {
            const { title, text } = req.body;
            if (title && text) {
                const task = new Task({ title, text });
                task
                    .save()
                    .then((task) => res.status(200).json(task))
                    .catch((error) => handleError(res, error));
            } else {
                res.status(200).json("Введіть всі потрібні дані в поля ввода");
            }
        } catch (e) {
            handleError(res, e);
        }
    }
    getList = (req, res) => {
        try {
            Task
                .find()
                .then((tasks) => res.status(200).json(tasks))
                .catch((error) => handleError(res, error));
        } catch (e) {
            handleError(res, e);
        }
    }
    deleteTask = (req, res) => {
        try {
            Task
                .findByIdAndDelete(req.params.id)
                .then(() => res.status(200).json(req.params.id + " <<< було видалено!"))
                .catch((error) => handleError(res, error));
        } catch (e) {
            handleError(res, e);
        }
    }

    putEditTask = (req, res) => {
        try {
            if(req.body.title && req.body.text) {
                const updateObj = {
                    title: req.body.title,
                    text: req.body.text
                };
                Task
                    .findByIdAndUpdate(req.params.id, updateObj, {new: true})
                    .then((task) => res.status(200).json(task))
                    .catch((error) => handleError(res, error));
            } else {
                handleError(res, "Будь ласка введіть всі дані!")
            }
        } catch (e) {
            handleError(res, e);
        }
    }
}

module.exports = new constructor();