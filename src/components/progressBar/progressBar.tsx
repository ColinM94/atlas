import styles from "./styles.module.scss";

interface Props {
  progress: number;
  maxProgress: number;
}

export const ProgressBar = (props: Props) => {
  const { progress, maxProgress } = props;

  const width = (progress / maxProgress) * 100;

  return (
    <div className={styles.container}>
      <div style={{ width: `${width}%` }} className={styles.progress}>
        {progress}
      </div>
    </div>
  );
};
