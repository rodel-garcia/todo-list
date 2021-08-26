import { MockedProvider } from '@apollo/client/testing';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TodoListTableCellAction from './todo-list-table-cell-actions';
import { Priority, Task } from '../../../app.definitions';

jest.mock('react-router-dom', () => ({
  useHistory: () => [],
}));

let container: HTMLDivElement | null;

describe('<TodoListTableCellAction />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <MockedProvider>
          <TodoListTableCellAction
            task={getTaskMock()}
            taskCompletionChange={() => null}
            taskPriorityChange={() => null}
            taskDelete={() => null}
          />
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

  test('if it render the action pane', () => {
    const actionPanel = container?.querySelector(
      '.ui.left.pointing.dropdown.icon.link'
    );
    expect(actionPanel).toBeInTheDocument();
  });
});

const getTaskMock = () =>
  ({
    id: '1',
    name: 'random task',
    description: '',
    completed: false,
    priority: Priority.HIGH,
    dateCreated: '',
  } as Task);
