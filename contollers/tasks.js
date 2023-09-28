const Task = require("../models/Task");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();

  res
    .status(200)
    .json({ status: "success", data: { tasks, count: tasks.length } });
});

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `Invalid task id ${id}` });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: `No task found with id ${id}` });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `Invalid task id ${id}` });
    }

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!task) {
      return res.status(404).json({ message: `No task found with id ${id}` });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `Invalid task id ${id}` });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: `No task found with id ${id}` });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
