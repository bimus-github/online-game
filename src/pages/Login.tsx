import { Link } from "@mui/material";
import React from "react";

function Login() {
  return (
    <div className={styles.main}>
      <form className={styles.formDiv}>
        <div className={styles.titleDiv}>Create Your Account</div>

        <div className={styles.inputDiv}>
          <p className={styles.inputTitle}>Email*</p>
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

        <button className={styles.btn}>Open</button>
        <p className={styles.link}>
          If you have no one, go to <Link href="/signup">Sign Up</Link> page
        </p>
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
};
