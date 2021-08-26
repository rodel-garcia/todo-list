import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import AddNewForm from './add-new-form/add-new-form';
import Popup from '../shared/popup/popup';
import TodoListTableBody from './todo-list-table-body/todo-list-table-body';
import TodoListTableHeader from './todo-list-table-header/todo-list-table-header';

import {
  ADD_NEW_TASK,
  GET_TASKS_LIST,
} from '../../graphql/todo-graphql-queries';

import {
  AddNewTaskResponse,
  GetTasksResponse,
  NewTaskParam,
  PopupSetter,
  Task,
} from '../../app.definitions';

import style from './todo-list.module.scss';

const TodoList: React.FC<{
  isPopupVisible: boolean;
  popupSetter: PopupSetter;
}> = ({ isPopupVisible, popupSetter }) => {
  const [taskList, setTaskList] = useState([] as Task[]);
  const { loading, error } = useQuery<GetTasksResponse>(GET_TASKS_LIST, {
    onCompleted: ({ getTasks }) => {
      setTaskList(getTasks);
    },
  });

  const [addNewTask] = useMutation<AddNewTaskResponse>(ADD_NEW_TASK, {
    onCompleted({ addNewTask }) {
      setTaskList((tasks) => [...tasks, addNewTask]);
    },
  });

  const onAddNewTask = (param: NewTaskParam) => {
    addNewTask({ variables: { newTaskParam: param } });
    popupSetter(false);
  };

  if (loading) {
    return <em>loading ...</em>;
  }

  if (error) {
    return <em>{error.message}</em>;
  }

  return (
    <div className={`ui container ${style['todo-list']}`}>
      {taskList?.length ? (
        <>
          <div className={style['tasks-details']}>
            <span>
              Total: <strong>{taskList.length}</strong>
            </span>
            <span>
              Completed:{' '}
              <strong>
                {taskList.filter((task) => task?.completed).length}
              </strong>
            </span>
          </div>
          <table className='ui sortable large celled table'>
            <TodoListTableHeader setTaskList={setTaskList} />
            <TodoListTableBody taskList={taskList} setTaskList={setTaskList} />
          </table>
        </>
      ) : (
        <em>List is empty</em>
      )}
      {isPopupVisible && (
        <Popup>
          <AddNewForm showPopup={popupSetter} addNewTask={onAddNewTask} />
        </Popup>
      )}
    </div>
  );
};

export default TodoList;
