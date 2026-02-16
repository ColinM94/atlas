import * as React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from 'inits/firebase';
import { InputText } from 'components/inputText/inputText';
import { Button } from 'components/button/button';

import styles from './styles.module.scss';

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user) return;
    alert('Login Failed');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <InputText
          value={email}
          setValue={setEmail}
          type="email"
          placeholder="Email"
          layer={2}
          className={styles.input}
        />

        <InputText
          value={password}
          setValue={setPassword}
          type="password"
          layer={2}
          placeholder="Password"
          className={styles.input}
        />

        <Button type="secondary" label="Login" isFormSubmit layer={2} />
      </form>
    </div>
  );
};
