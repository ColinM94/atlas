import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';
import 'material-symbols/rounded.css';

import { NotFoundPage } from 'pages/notFoundPage/notFoundPage';
import { HomePage } from 'pages/homePage/homePage';
import { sections } from 'constants/sections';

import './styles/global.scss';

export const App = () => {
  return (
    <>
      <Switch>
        {Object.values(sections).map((section) => {
          const Component = section.component;

          return (
            <Route path={`/${section.id}`}>
              <Component />
            </Route>
          );
        })}

        <Route path="/">
          <HomePage />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
