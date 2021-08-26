import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';

import App from './app';

let container: HTMLDivElement | null = null;

describe('<App />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <MockedProvider>
          <App />
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

  test('if it render the app', () => {
    const appRoot = container?.querySelector('.app');
    expect(appRoot).toBeInTheDocument();
  });

  test('if it render the app main content', () => {
    const main = container?.querySelector('main');
    expect(main).toBeInTheDocument();
  });
});
