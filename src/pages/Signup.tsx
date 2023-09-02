import React, { useState } from "react";
import { LinearProgress, Link } from "@mui/material";

//firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ERROR_ENUM, PLAYER_ENUM } from "../type";
import { useNavigate } from "react-router-dom";
import { addUser } from "../firebase/features/user";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ERROR_ENUM>(ERROR_ENUM.NONE);

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(ERROR_ENUM.NONE);
    if (password.length < 5) {
      setLoading(false);
      return setError(ERROR_ENUM.PASSWORD);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user logedIn: ", user);

        const id = (Math.random() * 1000000).toString();
        navigate("/");

        await addUser({ email, id, as: PLAYER_ENUM.NONE });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        if (errorCode === "auth/email-already-in-use")
          setError(ERROR_ENUM.INUSE);
        if (errorCode === "auth/network-request-failed")
          setError(ERROR_ENUM.NETWORK);

        // ..
      });

    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <form className={styles.formDiv} onSubmit={handleCreateAccount}>
        <div className={styles.titleDiv}>Create An Account</div>

        <div className="text-center w-full flex justify-center items-center">
          <p className="w-[80%]">
            You can be sure that your information will not be shared with
            anyone*
          </p>
        </div>

        <div className={styles.inputDiv}>
          <p className={styles.inputTitle}>Email*</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="eg: Muhammad Amin"
            className={`${styles.input} ${
              error === ERROR_ENUM.INUSE ? "border-[2px] border-red-400" : ""
            }`}
          />
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.inputTitle}>Password*</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="eg: 123***"
            className={`${styles.input} ${
              error === ERROR_ENUM.PASSWORD ? "border-[2px] border-red-400" : ""
            }`}
          />
        </div>

        <button className={styles.btn} type="submit">
          {loading ? <LinearProgress /> : "Create"}
        </button>
        <p className={styles.link}>
          If you already have one, go to <Link href="/">Login</Link> page
        </p>
        {error === ERROR_ENUM.PASSWORD && (
          <p className={styles.warning}>
            Password should contain at least 5 symbols!
          </p>
        )}
        {error === ERROR_ENUM.INUSE && (
          <p className={styles.warning}>This kind email is already in use!</p>
        )}
        {error === ERROR_ENUM.NETWORK && (
          <p className={styles.warning}>
            Please, check your network cennections!
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;

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
