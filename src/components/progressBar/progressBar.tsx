import styles from "./styles.module.scss";

interface Props {
  progress: number;
  maxProgress: number;
}

export const ProgressBar = (props: Props) => {
  const { progress, maxProgress } = props;

  const width = () => {
    const value = (progress / maxProgress) * 100;
    if (Number.isNaN(value)) return 0;
    return value;
  };

  return (
    <div className={styles.container}>
      <div className={styles.percentCompleteLabel}>
        {width().toFixed(0)}% Complete
      </div>
      <div className={styles.progressBar}>
        <div style={{ width: `${width()}%` }} className={styles.progress}></div>
      </div>
    </div>
  );
};
