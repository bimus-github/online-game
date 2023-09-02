import React, { useState } from "react";
import { Link } from "@mui/material";

//firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
          <p className={styles.inputTitle}>Email Or Name*</p>
          <input
            type="text"
            placeholder="eg: Muhammad Amin"
            className={styles.input}
          />
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.inputTitle}>Password*</p>
          <input
            type="text"
            placeholder="eg: 123***"
            className={styles.input}
          />
        </div>

        <button className={styles.btn} type="submit">
          Create
        </button>
        <p className={styles.link}>
          If you already have one, go to <Link href="/">Login</Link> page
        </p>
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
};
