import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Link, Route, Switch } from "wouter";
import "material-symbols/rounded.css";

import { HomePage } from "pages/homePage/homePage";
import { HabitsPage } from "pages/habitsPage/habitsPage";
import { TasksPage } from "pages/tasksPage/tasksPage";

import "./styles/global.scss";
import "./styles/theme.scss";
import styles from "./styles.module.scss";

export const App = () => {
  return (
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

          <Route>
            <div className={styles.pageNotFound}>
              <div className={styles.pageNotFoundCode}>404</div>
              <div className={styles.pageNotFoundMessage}>Page not found!</div>
              <Link to="/" className={styles.pageNotFoundButton}>
                Go Back
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
