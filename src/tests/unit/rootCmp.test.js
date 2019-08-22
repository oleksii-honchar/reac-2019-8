import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Root } from '../../modules/Root';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Root component elements', () => {
  it('should render passed title', () => {
    const title = 'Hello world';
    act(() => {
      ReactDOM.render(<Root title={title} />, container);
    });

    const header = container.querySelector('h1');

    expect(header.textContent).toBe(title);
  });
});
