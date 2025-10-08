import * as React from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch, useLocation } from "wouter";
import "material-symbols/rounded.css";

import { HomePage } from "pages/homePage/homePage";
import { HabitsPage } from "pages/habitsPage/habitsPage";
import { TasksPage } from "pages/tasksPage/tasksPage";
import { NotFoundPage } from "pages/notFoundPage/notFoundPage";
import { Button } from "components/button/button";

import "./styles/global.scss";
import "./styles/theme.scss";
import styles from "./styles.module.scss";

export const App = () => {
  const [location, navigate] = useLocation();

  return (
    <>
      {location !== "/" && (
        <Button
          icon="arrow_back"
          type="secondary"
          onClick={() => void navigate("/")}
          layer={0}
          className={styles.backButton}
        />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>

            <Route path="/habits">
              <HabitsPage />
            </Route>

            <Route path="/tasks">
              <TasksPage />
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
