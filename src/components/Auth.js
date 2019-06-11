import React, { useState } from "react";
import { useStore } from "effector-react";
import { ModalWindow } from "./ModalWindow";
import { $modals, openModalAuth, auth } from "../model";

export const AuthLinks = () => {
  const { isShowModalAuth } = useStore($modals);
  //state for signin and signup block
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [techData, setTechData] = useState({
    signin: false,
    signedout: false
  });
  //open signin modal
  const openSigninWindow = obj => {
    setTechData(obj); //set {signin:true} as true for signin and false for signup
    openModalAuth(true);
  };
  //get current user status form firebase - null if signed out
  const user = auth.currentUser;

  //submit data and close modal for two cases signin and signup
  const closeModalSendData = toggle => {
    if (toggle === "signup") {
      auth
        .createUserWithEmailAndPassword(signupData.email, signupData.password)
        .then(() => {
          //authentificate with signed up state
          auth.signInWithEmailAndPassword(
            signupData.email,
            signupData.password
          );
          alert("You successfully signed up and signed in!");
          openModalAuth(false); //close modal
        })
        .catch(err => alert(err));
    } else {
      auth
        .signInWithEmailAndPassword(signinData.email, signinData.password)
        .then(() => {
          setSigninData({ email: "", password: "" }); //clear signin state
          openModalAuth(false);
        })
        .catch(err => alert(err.message));
    }
  };
  //Validate fns
  const comparePasswords = (obj, pswKey1, pswKey2) =>
    obj[pswKey1] === obj[pswKey2];

  const checkObjForValue = (obj, value) => Object.values(obj).includes(value);

  // Handle fns
  const handleInput = e => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  //Handle submit Form
  const handleSubmit = (e, condition) => {
    e.preventDefault();
    if (condition === "signin") {
      checkObjForValue(signinData, "")
        ? alert("Fill all fields please!")
        : closeModalSendData("signin");
    } else if (condition === "signup") {
      if (comparePasswords(signupData, "password", "confirmPassword")) {
        checkObjForValue(signupData, "")
          ? alert("Fill all fields please!")
          : closeModalSendData("signup");
      } else {
        alert("Wrong password confirmation!");
        document.querySelector(".password").value = "";
        document.querySelector(".confirmPassword").value = "";
        document.querySelector(".password").focus();
      }
    }
  };
  //sign out
  const signout = () =>
    auth.signOut().then(() => {
      alert("You have signed out!");
      setTechData({ ...techData, signedout: true });
    });

  const { signin } = techData;
  return (
    <div className="auth-containter">
      <ModalWindow
        showModal={isShowModalAuth}
        closeModal={openModalAuth}
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
                  ? e => handleSubmit(e, "signin")
                  : e => handleSubmit(e, "signup")
              }
            >
              {signin ? "Sign in" : "Sign up"}
            </button>
          </form>
        }
      />
      <ul className="auth-btns">
        {!user ? (
          <>
            <li onClick={() => openSigninWindow({ signin: true })}>Sign in</li>
            <li onClick={() => openSigninWindow({ signin: false })}>Sign up</li>
          </>
        ) : (
          <>
            <li>{user && user.email}</li>
            <li onClick={() => signout()}>Sign out</li>
          </>
        )}
      </ul>
    </div>
  );
};
