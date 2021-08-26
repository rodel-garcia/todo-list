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
        <TableHead
          text='Name'
          isAscending={
            currentSort.direction === SortDirection.ASC &&
            currentSort.sortBy === SortOption.NAME
          }
          clickHandler={() => onTableHeaderClick(SortOption.NAME)}
        />
        <TableHead
          text='Description'
          isAscending={
            currentSort.direction === SortDirection.ASC &&
            currentSort.sortBy === SortOption.DESCRIPTION
          }
          clickHandler={() => onTableHeaderClick(SortOption.DESCRIPTION)}
        />
        <TableHead
          text='Priority'
          isAscending={
            currentSort.direction === SortDirection.ASC &&
            currentSort.sortBy === SortOption.PRIORITY
          }
          clickHandler={() => onTableHeaderClick(SortOption.PRIORITY)}
        />
        <TableHead
          text='Completed'
          isAscending={
            currentSort.direction === SortDirection.ASC &&
            currentSort.sortBy === SortOption.COMPLETED
          }
          clickHandler={() => onTableHeaderClick(SortOption.COMPLETED)}
        />
        <th></th>
      </tr>
    </thead>
  );
};

export default TodoListTableHeader;

const TableHead: React.FC<{
  text: string;
  isAscending: boolean;
  clickHandler: () => void;
}> = ({ text, isAscending, clickHandler }) => {
  return (
    <th
      onClick={() => clickHandler()}
      className={`sorted ${!isAscending ? 'descending' : 'ascending'}`}
    >
      {text}
    </th>
  );
};
