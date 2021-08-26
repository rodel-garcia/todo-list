import { MockedProvider } from '@apollo/client/testing';
import TestRenderer, { act, ReactTestRenderer } from 'react-test-renderer';

import TodoView from './todo-view';
import { GET_TASK } from '../../graphql/todo-graphql-queries';
import { Priority, Task } from '../../app.definitions';

jest.mock('react-router-dom', () => ({
  useRouteMatch: () => ({ params: { id: '1' } }),
}));

let component: ReactTestRenderer | undefined;

describe('<TodoView />', () => {
  beforeEach(async () => {
    component = TestRenderer.create(
      <MockedProvider mocks={[getProviderMock()]} addTypename={false}>
        <TodoView />
      </MockedProvider>
    );
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
  });

  afterEach(() => {
    component?.unmount();
    component = undefined;
  });

  test('if it render the view page', () => {
    const taskname = (component as ReactTestRenderer).root
      .findByType('h2')
      .children.join('');
    expect(taskname).toBe('random task');
  });
});

const getProviderMock = () => ({
  request: {
    query: GET_TASK,
    variables: { id: '1' },
  },
  result: {
    data: {
      getTask: {
        id: '1',
        name: 'random task',
        description: '',
        completed: false,
        priority: Priority.HIGH,
        dateCreated: '',
      } as Task,
    },
  },
});
