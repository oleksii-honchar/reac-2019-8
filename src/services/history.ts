import { createBrowserHistory, createMemoryHistory } from 'history';

export const historySvc = window.app.config.isNode
  ? createMemoryHistory()
  : createBrowserHistory();
