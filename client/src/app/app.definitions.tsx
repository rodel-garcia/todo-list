export interface Task {
  id: string;
  name: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
  dateCreated?: string;
}

export interface NewTaskParam {
  name: string;
  description?: String;
  priority?: Priority;
}

export interface TaskCompletionParam {
  id: string;
  completed: boolean;
}

export interface TaskPriorityParam {
  id: string;
  priority: Priority;
}

export interface TaskSortParam {
  direction: SortDirection;
  sortBy: SortOption;
}

export interface GetTasksResponse {
  getTasks: Task[];
}

export interface GetTaskResponse {
  getTask: Task;
}

export interface TaskCompletionResponse {
  updateTaskCompletion: boolean;
}

export interface TaskPriorityResponse {
  updateTaskPriority: Priority;
}

export interface AddNewTaskResponse {
  addNewTask: Task;
}

export interface DeleteTaskResponse {
  deleteTask: string;
}

export interface MatchParam {
  isExact: boolean;
  params: { id: string };
  path: string;
  url: string;
}

// emumerables
export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortOption {
  NAME = 'NAME',
  PRIORITY = 'PRIORITY',
  DESCRIPTION = 'DESCRIPTION',
  COMPLETED = 'COMPLETED',
}

// function types
export type SetTaskList = (tasks: Task[] | (() => Task[])) => void;
export type PopupSetter = (show: boolean) => void;
export type AddNewTask = (param: NewTaskParam) => void;
