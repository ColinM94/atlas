import styles from "./styles.module.scss";

interface Props {
 items: 
}

export const TableRows = () => {



  return (
    <>
      <tr className={styles.container}>
        <th className={styles.cell}>Name</th>
        <th className={styles.cell}>Age</th>
        <th className={styles.cell}>Job</th>
      </tr>
      <tr className={styles.row}>
        <td className={styles.cell}>Thomas</td>
        <td className={styles.cell}>Jimmy</td>
        <td className={styles.cell}>Jebediah Steinhozen III</td>
      </tr>
      <tr className={styles.row}>
        <td className={styles.cell}>Potato Eater</td>
        <td className={styles.cell}>Nurse</td>
        <td className={styles.cell}>Supreme Galactic Ruler</td>
      </tr>
    </>
  );
};
