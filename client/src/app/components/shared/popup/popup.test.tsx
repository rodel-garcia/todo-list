import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Popup from './popup';

let container: HTMLDivElement | null = null;

describe('<Popup />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(<Popup />, container);
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the popup', () => {
    const popup = container?.querySelector('.todo-popup');
    expect(popup).toBeInTheDocument();
  });
});
