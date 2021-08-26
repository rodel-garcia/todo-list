import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AddNewForm from './add-new-form';

let container: HTMLDivElement | null = null;

describe('<AddNewForm />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <AddNewForm addNewTask={() => {}} showPopup={() => {}} />,
        container
      );
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the form', () => {
    const todoForm = container?.querySelector('.todo-form');
    expect(todoForm).toBeInTheDocument();
  });

  test('if taskName field is shown', () => {
    const taskNameField = container?.querySelector('#taskName');
    expect(taskNameField).toBeInTheDocument();
  });

  test('if taskDescription field is shown', () => {
    const taskDescriptionField = container?.querySelector('#taskDescription');
    expect(taskDescriptionField).toBeInTheDocument();
  });

  test('if taskPriority field is shown', () => {
    const taskPriorityField = container?.querySelector('#taskPriority');
    expect(taskPriorityField).toBeInTheDocument();
  });

  test('if action buttons is shown', () => {
    const formAction = container?.querySelector('.form-action');
    expect(formAction).toBeInTheDocument();
  });
});
