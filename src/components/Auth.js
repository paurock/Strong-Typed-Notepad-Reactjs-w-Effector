import React, { useState, useRef } from "react";
import { useStore } from "effector-react";
import { ModalWindow, alertModal } from "./ModalWindow";

import {
  $modals,
  openModalAuth,
  openModalAlert,
  openModalLost,
  auth
} from "../model/model";

const ResetPasswordModal = () => {
  const [resetPasswordData, setResetPasswordData] = useState({ email: "" });
  const resetPasswordRequest = () => {
    auth
      .sendPasswordResetEmail(resetPasswordData.email)
      .then(() => {
        openModalLost(false);
        alertModal("Password sent").then(() => openModalAuth(true));
      })
      .catch(err => {
        openModalLost(false);
        alertModal(err.message).then(() => openModalLost(true));
      });
  };
  return (
    <div className="reset-password">
      <input
        onChange={e => setResetPasswordData({ email: e.target.value })}
        type="email2GetPassword"
        name="email2GetPassword"
        placeholder="Email"
      />
      <button onClick={() => resetPasswordRequest()}>Reset Password</button>
    </div>
  );
};
export const AuthLinks = () => {
  const {
    isShowModalAuth,
    isShowModalAlert,
    isShowLostModal,
    modalContent
  } = useStore($modals);
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

  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputPasswordConfirmation = useRef();

  //useRef to fill inputs field
  const setUpInputsValues = () => {
    inputEmail.current.value = signinData.email;
    inputPassword.current.value = signinData.password;
    inputEmail.current.value = signupData.email;
    inputPassword.current.value = signupData.password;
  };

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
        alertModal("Fill all fields please!").then(() => {
          openModalAuth(true);
          setUpInputsValues();
        });
      } else {
        closeModalSendData("signin");
      }
    } else if (condition === "signup") {
      if (comparePasswords(signupData, "password", "confirmPassword")) {
        if (checkObjForValue(signupData, "")) {
          openModalAuth(false);
          alertModal("Fill all fields please!").then(() => {
            openModalAuth(true);
            setUpInputsValues();
          });
        } else {
          closeModalSendData("signup");
        }
      } else {
        openModalAuth(false);
        alertModal("Wrong password confirmation!").then(() => {
          openModalAuth(true);
          setUpInputsValues();
          inputPasswordConfirmation.current.focus();
        });
      }
    }
  };
  //sign out
  const signout = () =>
    auth.signOut().then(() => {
      alertModal("You have signed out!");
      setTechData({ ...techData, signin: false });
    });

  const resetPassword = () => {
    openModalAuth(false);
    openModalLost(true);
    setTechData({ signin: true });
  };

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
                ref={inputEmail}
                type="email"
                className="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                onChange={e => handleInput(e)}
                ref={inputPassword}
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
                    ref={inputPasswordConfirmation}
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
              {signin && (
                <span
                  className="forgot-password"
                  onClick={() => resetPassword()}
                >
                  Forgot password?
                </span>
              )}
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
      <ModalWindow
        className="modal-lost-password"
        showModal={isShowLostModal}
        modalContent={<ResetPasswordModal />}
        closeModal={openModalLost}
      />
    </>
  );
};
