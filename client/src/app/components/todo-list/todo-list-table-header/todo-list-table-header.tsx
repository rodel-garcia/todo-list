import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_TASKS_LIST } from '../../../graphql/todo-graphql-queries';
import {
  GetTasksResponse,
  SortDirection,
  SortOption,
  Task,
  SetTaskList,
  TaskSortParam,
} from '../../../app.definitions';

const TodoListTableHeader: React.FC<{
  setTaskList: SetTaskList;
}> = ({ setTaskList }) => {
  const [currentSort, setCurrentSort] = useState({
    direction: SortDirection.ASC,
  } as TaskSortParam);
  const [getTasks] = useLazyQuery<GetTasksResponse>(GET_TASKS_LIST, {
    fetchPolicy: 'network-only',
    onCompleted({ getTasks }) {
      setTaskList(getTasks as Task[]);
    },
  });

  const onTableHeaderClick = (sortBy: SortOption) => {
    const param = {
      sortBy,
      direction:
        currentSort.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    };
    getTasks({
      variables: { taskSortParam: param },
    });
    setCurrentSort(param);
  };

  return (
    <thead>
      <tr>
        <th
          className={`sorted ${
            currentSort.direction === SortDirection.DESC &&
            currentSort.sortBy === SortOption.NAME
              ? 'descending'
              : 'ascending'
          }`}
          onClick={() => onTableHeaderClick(SortOption.NAME)}
        >
          Name
        </th>
        <th>Description</th>
        <th
          className={`sorted center aligned' ${
            currentSort.direction === SortDirection.DESC &&
            currentSort.sortBy === SortOption.PRIORITY
              ? 'descending'
              : 'ascending'
          }`}
          onClick={() => onTableHeaderClick(SortOption.PRIORITY)}
        >
          Priority
        </th>
        <th className='ui center aligned'>Completed</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TodoListTableHeader;
