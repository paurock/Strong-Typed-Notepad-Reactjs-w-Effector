import React, { useState } from "react";
import { useStore } from "effector-react";
import { ModalWindow, alertModal } from "./ModalWindow";

import { $modals, openModalAuth, openModalAlert, auth } from "../model";

export const AuthLinks = () => {
  const { isShowModalAuth, isShowModalAlert, modalContent } = useStore($modals);
  //state for signin and signup block
  const [signinData, setSigninData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [techData, setTechData] = useState({
    signin: false
  });

  //open signin modal
  const openSigninWindow = signinObj => {
    setTechData(signinObj); //set {signin:true} as true for signin and false for signup
    openModalAuth(true);
  };
  //get current user status form firebase - null if signed out
  const user = auth.currentUser;

  //submit data and close modal for two cases signin and signup
  const closeModalSendData = toggle => {
    if (toggle === "signup") {
      auth
        .createUserWithEmailAndPassword(signupData.email, signupData.password)
        .then(() =>
          //authentificate with signed up state
          auth.signInWithEmailAndPassword(signupData.email, signupData.password)
        )
        .then(() => {
          openModalAuth(false); //close Auth modal
          alertModal("You successfully signed up and signed in!");
        })
        .catch(err => {
          openModalAuth(false);
          alertModal(err.message).then(() => openModalAuth(true));
        });
    } else {
      auth
        .signInWithEmailAndPassword(signinData.email, signinData.password)
        .then(() => {
          setSigninData({ email: "", password: "" }); //clear signin state
          openModalAuth(false); //Close modal
        })
        .catch(err => {
          openModalAuth(false);
          alertModal(err.message).then(() => openModalAuth(true));
        });
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
      if (checkObjForValue(signinData, "")) {
        openModalAuth(false);
        alertModal("Fill all fields please!").then(() => openModalAuth(true));
      } else {
        closeModalSendData("signin");
      }
    } else if (condition === "signup") {
      if (comparePasswords(signupData, "password", "confirmPassword")) {
        if (checkObjForValue(signupData, "")) {
          openModalAuth(false);
          alertModal("Fill all fields please!").then(() => openModalAuth(true));
        } else {
          closeModalSendData("signup");
        }
      } else {
        openModalAuth(false);
        alertModal("Wrong password confirmation!").then(() =>
          openModalAuth(true)
        );
        document.querySelector(".password").value = "";
        document.querySelector(".confirmPassword").value = "";
        document.querySelector(".password").focus();
      }
    }
  };
  //sign out
  const signout = () =>
    auth.signOut().then(() => {
      alertModal("You have signed out!");
      setTechData({ ...techData, signin: false });
    });

  const { signin } = techData;
  return (
    <>
      <ModalWindow
        className="modalAlert"
        closeBtn={false}
        showModal={isShowModalAlert}
        modalContent={modalContent}
        closeModal={openModalAlert}
      />
      <div className="auth-containter">
        <ModalWindow
          showModal={isShowModalAuth}
          closeModal={openModalAuth}
          modalContent={
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
              <li onClick={() => openSigninWindow({ signin: true })}>
                Sign in
              </li>
              <li onClick={() => openSigninWindow({ signin: false })}>
                Sign up
              </li>
            </>
          ) : (
            <>
              <li>{user && user.email}</li>
              <li onClick={() => signout()}>Sign out</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
