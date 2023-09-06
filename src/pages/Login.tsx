import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { LinearProgress, Link } from "@mui/material";

import { ERROR_ENUM } from "../type";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ERROR_ENUM>(ERROR_ENUM.NONE);

  const handleOpenApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(ERROR_ENUM.NONE);
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        if (errorCode === "auth/network-request-failed")
          setError(ERROR_ENUM.NETWORK);
        if (errorCode === "auth/invalid-email") setError(ERROR_ENUM.EMAIL);
        if (errorCode === "auth/wrong-password") setError(ERROR_ENUM.PASSWORD);
      });

    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <form className={styles.formDiv} onSubmit={handleOpenApp}>
        <div className={styles.titleDiv}>Create Your Account</div>

        <div className={styles.inputDiv}>
          <p className={styles.inputTitle}>Email*</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="eg: Muhammad Amin"
            className={styles.input}
          />
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.inputTitle}>Password*</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="eg: 123***"
            className={styles.input}
          />
        </div>

        <button className={styles.btn} type="submit">
          {loading ? <LinearProgress /> : "Open"}
        </button>
        <p className={styles.link}>
          If you have no one, go to <Link href="/signup">Sign Up</Link> page
        </p>

        {error === ERROR_ENUM.NETWORK && (
          <p className={styles.warning}>
            Please, check your network cennections!
          </p>
        )}
        {error === ERROR_ENUM.EMAIL && (
          <p className={styles.warning}>No found such user!</p>
        )}
        {error === ERROR_ENUM.PASSWORD && (
          <p className={styles.warning}>Please, enter the correct password!</p>
        )}
      </form>
    </div>
  );
}

export default Login;

const styles = {
  main: "flex justify-center items-center h-screen",
  formDiv:
    "w-[500px] lg:w-[400px] sm:w-[350px] bg-bg p-5 rounded-lg shadow-lg gap-4 flex flex-col",
  titleDiv: "text-[25px] flex justify-center items-center",
  inputDiv: "w-full flex flex-col",
  inputTitle: "pl-3 p-1 font-serif",
  input: "p-3 rounded-lg shadow placeholder:font-mono",
  btn: "bg-bg-btn hover:bg-bg-btn-l p-3 rounded-lg",
  link: "pl-3",
  warning: "pl-3 text-red-400 font-serif",
};
