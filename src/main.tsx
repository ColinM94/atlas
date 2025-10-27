import * as React from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch } from "wouter";
import "material-symbols/rounded.css";

import { HomePage } from "pages/homePage/homePage";
import { HabitsPage } from "pages/habitsPage/habitsPage";
import { TasksPage } from "pages/tasksPage/tasksPage";
import { NotFoundPage } from "pages/notFoundPage/notFoundPage";
import { TaskPage } from "pages/taskPage/taskPage";

import "./styles/global.scss";
import "./styles/theme.scss";

export const App = () => {
  return (
    <>
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

        <Route path="/tasks/:taskId">
          <TaskPage />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
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
