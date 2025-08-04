import * as React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { useAppStore } from "stores/appStore";
import { Login } from "components/login/login";
import { Navbar } from "components/navbar/navbar";
import { pb } from "inits/backend";

import styles from "./styles.module.css";

const Root = () => {
  const { user, updateAppStore } = useAppStore();

  const [isInitialising, setIsInitialising] = React.useState(true);

  const initialise = () => {
    if (pb.authStore.isValid) {
      updateAppStore({
        user: {
          id: pb.authStore.record?.id || "",
        },
      });
    }

    setIsInitialising(false);
  };

  React.useEffect(() => {
    initialise();
  }, []);

  if (isInitialising) return "...loading";

  // if (!user.id) return <Login />;

  return (
    <>
      <div className={styles.container}>
        {/* <Header className={styles.header} /> */}

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>

      <Navbar />

      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
