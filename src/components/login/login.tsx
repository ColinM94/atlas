import * as React from "react";

import { Button } from "components/button/button";
import { InputText } from "components/inputText/inputText";
import { Card } from "components/card/card";
import { pb } from "inits/backend";
import { useAppStore } from "stores/appStore";

import { LoginToggle } from "./components/loginToggle/loginToggle";

import styles from "./styles.module.css";
import { FormSubmitEvent } from "types/general";

export const Login = () => {
  const { updateAppStore } = useAppStore();

  const [showSignIn, setShowSignIn] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handleSubmit = async (e?: FormSubmitEvent) => {
    try {
      e?.preventDefault();

      if (!email) throw "No email entered";
      if (!password) throw "No password entered";

      if (!showSignIn) {
        if (!password2) throw "No re-typed password";

        await pb.collection("users").create({
          email,
          password,
          passwordConfirm: password,
        });
      }

      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      updateAppStore({
        user: {
          id: authData.record.id,
        },
      });
    } catch (error) {
      alert(String(error));
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <LoginToggle
            showSignIn={showSignIn}
            setShowSignIn={setShowSignIn}
            className={styles.toggles}
          />

          <InputText
            value={email}
            setValue={setEmail}
            surface={1}
            placeholder="Email"
          />

          <InputText
            value={password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
            surface={1}
          />

          {!showSignIn && (
            <InputText
              value={password2}
              setValue={setPassword2}
              placeholder="Re-type Password"
              type="password"
              surface={1}
            />
          )}

          <Button
            label={showSignIn ? "Sign In" : "Sign Up"}
            onClick={handleSubmit}
            surface={1}
            className={styles.button}
          />
        </form>
      </Card>
    </div>
  );
};
