import TodoListTableAction from '../todo-list-table-cell-actions/todo-list-table-cell-actions';
import { Priority, Task } from '../../../app.definitions';
import style from './todo-list-table-body.module.scss';

const TodoListTableBody: React.FC<{
  taskList: Task[];
  setTaskList: Function;
}> = ({ taskList, setTaskList }) => {
  const tasks = [...taskList];

  const taskDeletionhandler = (id: string) => {
    const idx = tasks.findIndex((task) => id === task.id);
    tasks.splice(idx, 1);
    setTaskList(() => [...tasks]);
  };
  const taskCompletionhandler = (id: string, isCompleted: boolean) => {
    const newTasks = tasks.reduce((acc, task, idx) => {
      acc[idx] = { ...task };
      if (task.id === id) {
        acc[idx] = { ...task, completed: isCompleted };
      }
      return acc;
    }, [] as Task[]);
    setTaskList(() => [...newTasks]);
  };
  const taskPriorityhandler = (id: string, priority: Priority) => {
    const newTasks = tasks.reduce((acc, task, idx) => {
      acc[idx] = { ...task };
      if (task.id === id) {
        acc[idx] = { ...task, priority };
      }
      return acc;
    }, [] as Task[]);
    setTaskList(() => [...newTasks]);
  };

  return (
    <tbody>
      {tasks.map((task) => (
        <tr
          className={`${
            task.completed
              ? 'positive'
              : task.priority === Priority.MEDIUM ||
                task.priority === Priority.LOW
              ? 'warning'
              : 'negative'
          }`}
          key={task.id}
        >
          <td className={style['name-cell']}>
            <span>{task.name}</span>
          </td>
          <td className={style['description-cell']}>
            <span>{task.description}</span>
          </td>
          <td className='center aligned'>{task.priority}</td>
          <td className='center aligned'>{task.completed ? 'YES' : 'NO'}</td>
          <td className='center aligned'>
            <TodoListTableAction
              task={task}
              taskCompletionChange={taskCompletionhandler}
              taskPriorityChange={taskPriorityhandler}
              taskDelete={taskDeletionhandler}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TodoListTableBody;
