const { v4: uuidv4 } = require('uuid');

const tasks = [
  {
    id: '1',
    name: 'My first task',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    completed: false,
    priority: 'HIGH',
    dateCreated: '2021-08-22T06:40:59.157Z',
  },
  {
    id: '2',
    name: 'My second Task',
    completed: true,
    description: 'Lorem ipsum dolor sit amet',
    priority: 'LOW',
    dateCreated: '2021-07-12T06:40:00.157Z',
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
      const newTask = {
        ...args.newTaskParam,
        id: uuidv4(),
        dateCreated: new Date().toISOString(),
      };
      tasks.push(newTask);
      return newTask;
    },
    deleteTask: (_, args) => {
      const idx = tasks.findIndex((task) => args.id === task.id);
      tasks.splice(idx, 1);
      return args.id;
    },
    updateTaskCompletion: (_, args) => {
      const task = tasks.find((task) => task.id === args.updateParam.id);
      task['completed'] = args.updateParam.completed;
      return args.updateParam.completed;
    },
    updateTaskPriority: (_, args) => {
      const task = tasks.find((task) => task.id === args.updateParam.id);
      task['priority'] = args.updateParam.priority;
      return args.updateParam.priority;
    },
  },
};

function applySort(a, b, sortparam) {
  const { sortBy, direction } = sortparam;
  const prop = sortBy.toLowerCase();
  const [firt, second] = [a[prop].toLowerCase(), b[prop].toLowerCase()];
  return direction === 'ASC'
    ? firt > second
      ? 1
      : second > firt
      ? -1
      : 0
    : second > firt
    ? 1
    : firt > second
    ? -1
    : 0;
}
