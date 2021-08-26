import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  useRouteMatch: () => null,
}));

import MainHeader from './main-header';

let container: HTMLDivElement | null = null;

describe('<MainHeader />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(<MainHeader popupSetter={() => {}} />, container);
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the main header', () => {
    const appRoot = container?.querySelector('.main-header');
    expect(appRoot).toBeInTheDocument();
  });

  test('if it render the page title', () => {
    const linkElement = screen.getByText(/My Tasks/i);
    expect(linkElement).toBeInTheDocument();
  });
});
