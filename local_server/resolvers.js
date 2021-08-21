const { v4: uuidv4 } = require('uuid');

const tasks = [
  {
    id: '1',
    name: 'My first task',
    completed: false,
    priority: 'HIGH',
  },
  {
    id: '2',
    name: 'My second Task',
    completed: true,
    priority: 'LOW',
  },
];

module.exports = {
  Query: {
    getTasks: (_, args) => {
      if (args.sort) {
        return tasks.sort((a, b) => applySort(a, b, args.sort));
      }
      return tasks;
    },
    getTask: (_, args) => tasks.find((task) => task.id === args.id),
  },
  Mutation: {
    addNewTask: (_, args) => {
      const newTask = { ...args.newTaskParam, id: uuidv4() };
      tasks.push(newTask);
      return newTask.id;
    },
    deleteTask: (_, args) => {
      const idx = tasks.findIndex((task) => args.id === task.id);
      tasks.splice(idx, 1);
      return true;
    },
    updateTaskCompletion: (_, args) => {
      const task = tasks.find((task) => task.id === args.updateParam.id);
      task['completed'] = args.updateParam.completed;
      return true;
    },
  },
};

function applySort(a, b, sortparam) {
  const { sortBy, direction } = sortparam;
  const prop = sortBy.toLowerCase();
  return direction === 'ASC'
    ? a[prop] > b[prop]
      ? 1
      : b[prop] > a[prop]
      ? -1
      : 0
    : b[prop] > a[prop]
    ? 1
    : a[prop] > b[prop]
    ? -1
    : 0;
}
