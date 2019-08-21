import { createBrowserHistory, createMemoryHistory } from 'history';

export const historySvc = window.config.isNode
  ? createMemoryHistory()
  : createBrowserHistory();
