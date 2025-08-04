import * as React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { pb } from "inits/backend";
import { useAppStore } from "stores/useAppStore/useAppStore";

import styles from "./styles.module.scss";

const Root = () => {
  const [isInitialising, setIsInitialising] = React.useState(true);

  const initialise = () => {
    if (pb.authStore.isValid) {
      useAppStore.setState({
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

      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
