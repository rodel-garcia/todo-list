import gql from 'graphql-tag';

export const GET_TASKS_LIST = gql`
  query tasks($taskSortParam: TaskSortParam) {
    getTasks(sort: $taskSortParam) {
      id
      name
      description
      priority
      completed
      dateCreated
    }
  }
`;

export const GET_TASK = gql`
  query task($id: ID!) {
    getTask(id: $id) {
      id
      name
      description
      priority
      completed
      dateCreated
    }
  }
`;

export const ADD_NEW_TASK = gql`
  mutation addTask($newTaskParam: NewTaskParam) {
    addNewTask(newTaskParam: $newTaskParam) {
      id
      name
      description
      priority
      completed
      dateCreated
    }
  }
`;

export const SET_TASK_COMPLETION = gql`
  mutation updateCompletion($updateParam: TaskCompletionParam!) {
    updateTaskCompletion(updateParam: $updateParam)
  }
`;

export const SET_TASK_PRIORITY = gql`
  mutation updatePriority($updateParam: TaskPriorityParam!) {
    updateTaskPriority(updateParam: $updateParam)
  }
`;

export const DELETE_TASK = gql`
  mutation delete($id: ID) {
    deleteTask(id: $id)
  }
`;
