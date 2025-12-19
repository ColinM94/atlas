import * as React from 'react';
import { useLocation } from 'wouter';

import { InputText } from 'components/inputText/inputText';
import { Button } from 'components/button/button';

import styles from './styles.module.scss';

export const LoginPage = () => {
  const [, navigate] = useLocation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    navigate('tasks');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <InputText value={email} setValue={setEmail} type="email" className={styles.input} />
        <InputText
          value={password}
          setValue={setPassword}
          type="password"
          className={styles.input}
        />

        <Button type="secondary" label="Login" isFormSubmit layer={2} />
      </form>
    </div>
  );
};
