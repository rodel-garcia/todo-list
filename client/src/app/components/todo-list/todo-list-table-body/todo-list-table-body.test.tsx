import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { Task } from '../../../app.definitions';

import TodoListTableBody from './todo-list-table-body';

let container: HTMLDivElement | null = null;

describe('<TodoListTableBody />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <MockedProvider>
          <table>
            <TodoListTableBody
              taskList={getTaskListMock()}
              setTaskList={() => {}}
            />
          </table>
        </MockedProvider>,
        container
      );
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the table body', () => {
    const tBody = container?.querySelector('tbody');
    expect(tBody).toBeInTheDocument();
  });

  test('if it render the table body with 2 rows', () => {
    const tableRow = container?.querySelectorAll('tr').length;
    expect(tableRow).toEqual(2);
  });

  test('if it render the table body with 5 columns', () => {
    const tableRow = container?.querySelectorAll('tr:first-child td').length;
    expect(tableRow).toEqual(5);
  });
});

const getTaskListMock = () =>
  [
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
  ] as Task[];
