import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DELETE_TASK,
  SET_TASK_COMPLETION,
  SET_TASK_PRIORITY,
} from '../../../graphql/todo-graphql-queries';
import {
  DeleteTaskResponse,
  Priority,
  Task,
  TaskCompletionResponse,
  TaskPriorityResponse,
} from '../../../app.definitions';

type TaskCompletionChange = (id: string, isTaskCompleted: boolean) => void;
type TaskPriorityChange = (id: string, priority: Priority) => void;
type TaskDelete = (id: string) => void;

const TodoListTableAction: React.FC<{
  task: Task;
  taskCompletionChange: TaskCompletionChange;
  taskPriorityChange: TaskPriorityChange;
  taskDelete: TaskDelete;
}> = ({ task, taskCompletionChange, taskPriorityChange, taskDelete }) => {
  const history = useHistory();
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const [updateTaskCompletion] = useMutation<TaskCompletionResponse>(
    SET_TASK_COMPLETION,
    {
      onCompleted: ({ updateTaskCompletion }) =>
        taskCompletionChange(task.id, updateTaskCompletion),
    }
  );
  const [updateTaskPriority] = useMutation<TaskPriorityResponse>(
    SET_TASK_PRIORITY,
    {
      onCompleted: ({ updateTaskPriority }) =>
        taskPriorityChange(task.id, updateTaskPriority),
    }
  );
  const [deleteTask] = useMutation<DeleteTaskResponse>(DELETE_TASK, {
    onCompleted: ({ deleteTask }) => taskDelete(deleteTask),
  });

  return (
    <div
      className='ui left pointing dropdown icon link'
      onClick={() => setMenuVisibility(!isMenuVisible)}
      onBlur={() => setMenuVisibility(false)}
      tabIndex={-1}
    >
      <i className='ellipsis vertical icon'></i>
      <div
        style={{ margin: '-0.6rem 0 0 1em' }}
        className={`menu ${isMenuVisible ? 'transition visible' : ''}`}
      >
        <div className='item' onClick={() => history.push(`/tasks/${task.id}`)}>
          <i className='external alternate icon'></i>
          View Task
        </div>
        <div className='divider'></div>
        <div className='header'>
          <i className='tags icon'></i>
          Set Priority
        </div>
        <div className='divider'></div>
        {[Priority.LOW, Priority.MEDIUM, Priority.HIGH].map((priority, idx) => (
          <div
            key={idx}
            className={`item ${task.priority === priority && 'disabled'}`}
            onClick={() =>
              updateTaskPriority({
                variables: { updateParam: { id: task.id, priority } },
              })
            }
          >
            {priority}
          </div>
        ))}
        <div className='divider'></div>
        <div
          className='item'
          onClick={() =>
            updateTaskCompletion({
              variables: {
                updateParam: { id: task.id, completed: !task.completed },
              },
            })
          }
        >
          <i className={`thumbs ${task.completed ? 'down' : 'up'} icon`}></i>
          Mark as {task.completed ? 'incomplete' : 'complete'}
        </div>
        <div className='divider'></div>
        <div
          className='item red'
          onClick={() => deleteTask({ variables: { id: task.id } })}
        >
          <i className='red close icon'></i>Delete
        </div>
      </div>
    </div>
  );
};

export default TodoListTableAction;
