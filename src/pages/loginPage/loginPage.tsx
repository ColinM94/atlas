import * as React from 'react';

import { InputText } from 'components/inputText/inputText';

import styles from './styles.module.scss';
import { Button } from 'components/button/button';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.label}>Login Page</div>

      <form onSubmit={handleLogin} className={styles.loginForm}>
        <InputText value={email} setValue={setEmail} type="email" className={styles.input} />
        <InputText
          value={password}
          setValue={setPassword}
          type="password"
          className={styles.input}
        />

        <Button type="secondary" label="Login" isFormSubmit layer={1} />
      </form>
    </div>
  );
};
