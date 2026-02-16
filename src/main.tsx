import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch, useLocation } from 'wouter';
import { onAuthStateChanged } from 'firebase/auth';
import 'material-symbols/rounded.css';

import { NotFoundPage } from 'pages/notFoundPage/notFoundPage';
import { HomePage } from 'pages/homePage/homePage';
import { sections as sectionsObject } from 'constants/sections';

import './styles/global.scss';
import { LoginPage } from 'pages/loginPage/loginPage';
import { auth } from 'inits/firebase';

export const App = () => {
  const [location, navigate] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const sections = Object.values(sectionsObject);
  const firstSection = sections[0];

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user?.uid));
    });

    return () => unsubscribe?.();
  }, []);

  React.useEffect(() => {
    const noAuthRoutes = ['/', '/login'];

    if (isLoggedIn && noAuthRoutes.includes(location)) navigate(`/${firstSection.id}`);
    if (!isLoggedIn && !noAuthRoutes.includes(location)) navigate('/');
  }, [isLoggedIn && location]);

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

        <Route path="/login">
          <LoginPage />
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
