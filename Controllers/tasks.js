const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async');
const { createCustomError, CustomAPIError } = require('../errors/custom-errors');


const showTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks })
})

const showSpecificTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id }).exec();
    if (!task) {
        return next(createCustomError(`No task with id : ${id}`, 404))
    }
    res.status(200).json({ success: true, data: task });
})

const addTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const updateTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
        runValidators: true,
        new: true,
    });
    return res.status(200).json({ success: true, data: updateTask })

})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id }).exec();
    if (!task) {
        return next(CustomAPIError(404, `Task not found with id ${id}`));
    }
    return res.status(200).json({ success: true, data: null });
})
module.exports = {
    showTasks,
    showSpecificTask,
    addTasks,
    updateTask,
    deleteTask,
};