const createPath = require('../helpers/create-path');
const Task = require('../models/task-model');

const handleError = (res, error) => {
    console.log(error);
    res.send('Error 404');
}
const objData = {
    idTask: undefined,
}

class constructor {
    getIndex = (req, res) => {
        try {
            res.render(createPath("index"));
        } catch (e) {
            handleError(res, e);
        }
    }

    getAddTask = (req, res) => {
        try {
            res.render(createPath("add-task"), {title: "", text:"",field: ""});
        } catch (e) {
            handleError(res, e);
        }
    }
    postAddTask = (req, res) => {
        try {
            const { title, text } = req.body;
            if (title && text) {
                const task = new Task({ title, text });
                task
                    .save()
                    .then(() => res.redirect('/list'))
                    .catch((error) => handleError(res, error));
            } else {
                res.render(createPath("add-task"), {title: title, text: text,field: "Будь ласка заповніть всі поля"});
            }
        } catch (e) {
            handleError(res, e);
        }
    }
    getList = (req, res) => {
        try {
            Task
                .find()
                .then((tasks) => res.render(createPath("list"), { tasks }))
                .catch((error) => handleError(res, error));
            //res.render(createPath("list"));
        } catch (e) {
            handleError(res, e);
        }
    }
    deleteTask = (req, res) => {
        try {
            Task
            .findByIdAndDelete(req.params.id)
            .then(result => res.sendStatus(200))
            .catch((error) => handleError(res, error));
        } catch (e) {
            handleError(res, e);
        }
    }
    getEditTask = (req, res) => {
        try {
            Task
                .findById(req.params.id)
                .then((task) =>{
                    objData.idTask = task.id;
                    res.render(createPath("edit-task"), {id: objData.idTask, title: task.title, text: task.text, field: ""})
                })
                .catch((error) =>  handleError(res, error));
        } catch (e) {
            handleError(res, e);
        }
    }
    postEditTask = (req, res) => {
        try {
            if(req.body.title && req.body.text) {
                const updateObj = {
                    title: req.body.title,
                    text: req.body.text
                };
                Task
                    .findByIdAndUpdate(req.params.id, updateObj)
                    .then((result) => res.redirect("/list"))
                    .catch((error) => handleError(res, error));
            } else {
                res.render(createPath("edit-task"), {id: objData.idTask ,title: req.body.title, text: req.body.text, field: "Будь ласка заповніть всі поля" });
            }
        } catch (e) {
            handleError(res, e);
        }
    }
}

module.exports = new constructor();