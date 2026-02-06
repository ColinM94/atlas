import * as React from 'react';
import { MainLayout } from 'layouts/mainLayout/mainLayout';

import { formatDate } from 'utils/formatDate';
import { InputText } from 'components/inputText/inputText';
import { mergeReducer } from 'utils/mergeReducer';
import { Task } from 'types/task';

import styles from './styles.module.scss';

export const TaskPage = () => {
  const [state, updateState] = React.useReducer(mergeReducer<Task>, {
    id: '123324',
    name: 'Sort your shit out',
    checked: false,
    dueDate: 0,
  });

  return (
    <MainLayout className={styles.container}>
      <div className={styles.basicInfo}>
        <div className={styles.name}>Sort your shit out</div>

        <InputText value={state.name} setValue={(name) => updateState({ name })} layer={0} />

        <div className={styles.description}>
          You just gotta like totally sort your shit out, do you know what I mean, bro?
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.dueDate}>
          <div className={styles.dueDateLabel}>Due</div>
          <div className={styles.dueDateValue}>{formatDate(new Date(), 'utc', '.')}</div>
        </div>
      </div>
    </MainLayout>
  );
};
