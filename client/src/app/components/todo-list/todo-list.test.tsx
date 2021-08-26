import { MockedProvider } from '@apollo/client/testing';
import TestRenderer, { act, ReactTestRenderer } from 'react-test-renderer';

import TodoList from './todo-list';
import { GET_TASKS_LIST } from '../../graphql/todo-graphql-queries';
import { Priority, Task } from '../../app.definitions';

jest.mock('react-router-dom', () => ({
  useHistory: () => [],
}));

let component: ReactTestRenderer | undefined;

describe('<TodoList />', () => {
  beforeEach(async () => {
    const tasksMock = {
      request: {
        query: GET_TASKS_LIST,
      },
      result: {
        data: {
          getTasks: [
            {
              id: '1',
              name: 'random task',
              description: '',
              completed: false,
              priority: Priority.HIGH,
              dateCreated: '',
            },
          ] as Task[],
        },
      },
    };

    component = TestRenderer.create(
      <MockedProvider mocks={[tasksMock]} addTypename={false}>
        <TodoList isPopupVisible={true} popupSetter={() => true} />
      </MockedProvider>
    );
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
  });

  afterEach(() => {
    component?.unmount();
    component = undefined;
  });

  test('if it render the task-list page', () => {
    const todoList = (component as ReactTestRenderer).root.findAllByType(
      'div'
    )[0].props.className;
    expect(todoList).toBe('ui container todo-list');
  });

  test('if it render the task-list detail section', () => {
    const taskDetail = (component as ReactTestRenderer).root.findByProps({
      className: 'tasks-details',
    }).children;
    expect(taskDetail.length).toBe(2);
  });

  test('if it render the task-list table', () => {
    const taskListTableClasses = (
      component as ReactTestRenderer
    ).root.findByType('table').props.className;
    expect(taskListTableClasses).toBe('ui sortable large celled table');
  });
});
