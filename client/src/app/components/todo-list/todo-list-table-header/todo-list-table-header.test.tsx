import { MockedProvider } from '@apollo/client/testing';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TodoListTableHeader from './todo-list-table-header';

let container: HTMLDivElement | null;

describe('<TodoListTableHeader />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <MockedProvider>
          <table>
            <TodoListTableHeader setTaskList={() => null} />
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

  test('if it render the table header with 5 column', () => {
    const tableheader = container?.querySelectorAll('th');
    expect(tableheader?.length).toBe(5);
  });

  test('if it shows 2 header that can be sort', () => {
    const tableheader = container?.querySelectorAll('th.sorted');
    expect(tableheader?.length).toBe(2);
  });
});
