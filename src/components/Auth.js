import React, { useState } from "react";
import { ModalWindow } from "./ModalWindow";

export const AuthLinks = () => {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [techData, setTechData] = useState({
    toggle: false,
    signin: false
  });

  const closeModalSendData = () => {
    setSignInData({ email: "", password: "" });
    setSignUpData({
      email: "",
      password: "",
      confirmPassword: ""
    });

    setTechData({ ...techData, toggle: false });
  };
  //Validate fns
  const comparePasswords = (obj, pswKey1, pswKey2) =>
    obj[pswKey1] === obj[pswKey2];

  const checkObjForValue = (obj, value) => Object.values(obj).includes(value);

  // Handle fns
  const handleInput = e => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, condition) => {
    e.preventDefault();
    if (condition === "signIn") {
      checkObjForValue(signInData, "")
        ? alert("Fiil all fields please!")
        : closeModalSendData();
    } else if (condition === "signUp") {
      if (comparePasswords(signUpData, "password", "confirmPassword")) {
        checkObjForValue(signUpData, "")
          ? alert("Fiil all fields please!")
          : closeModalSendData();
      } else {
        alert("Wrong password confirmation!");
        document.querySelector(".password").focus();
      }
    }
  };
  const { signin, toggle } = techData;
  return (
    <div className="auth-containter">
      <ModalWindow
        showModal={toggle}
        closeBtn={false}
        contentModal={
          <form
            className={signin ? "signin" : "signup"}
            onSubmit={handleSubmit}
          >
            <input
              onChange={e => handleInput(e)}
              type="email"
              className={signin ? "signin" : "signup"}
              name="email"
              placeholder="Email"
              required
            />
            <input
              onChange={e => handleInput(e)}
              type="password"
              className="password"
              name="password"
              placeholder={signin ? "Password" : "Create password"}
              required
            />
            {signin ? null : (
              <>
                <input
                  onChange={e => handleInput(e)}
                  type="password"
                  className="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                />
              </>
            )}
            <button
              className={signin ? "signin" : "signup"}
              href=""
              onClick={
                signin
                  ? e => handleSubmit(e, "signIn")
                  : e => handleSubmit(e, "signUp")
              }
            >
              {signin ? "Sign in" : "Sign up"}
            </button>
          </form>
        }
      />
      <ul className="auth-btns">
        <li onClick={() => setTechData({ toggle: true, signin: true })}>
          Sign in
        </li>
        <li onClick={() => setTechData({ toggle: true, signin: false })}>
          Sign up
        </li>
      </ul>
    </div>
  );
};
