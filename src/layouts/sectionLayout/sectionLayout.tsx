import styles from "./styles.module.scss";

export const SectionsLayout = () => {
  // const [location, navigate] = useLocation();

  // const name = getCurrentRouteName(location);
  // const section = sections[name || ""];

  return (
    <>
      <div className={styles.header}>
        {/* <Button
          icon="arrow_back"
          type="secondary"
          onClick={() => void navigate({ to: "/" })}
          className={styles.backButton}
        /> */}

        <div className={styles.heading}>
          {/* <Icon icon={section?.icon} className={styles.headingIcon} /> */}
          {/* <div className={styles.headingLabel}>{section?.name}</div> */}
        </div>
      </div>

      {/* <Outlet /> */}
    </>
  );
};
