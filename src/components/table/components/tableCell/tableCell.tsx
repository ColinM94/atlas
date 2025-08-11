import styles from "./styles.module.scss";

interface TableCellProps {
  value: string;
}

export const TableCell = (props: TableCellProps) => {
  return <td className={styles.container}></td>;
};
