import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import Button from "../../shared/UIComponents/Button";
import Modal from "../../shared/UIComponents/Modal";
import Input from "../../shared/UIComponents/Input";
import ErrorModal from "../../shared/UIComponents/ErrorModal";
import LoadingSpinner from "../../shared/UIComponents/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import { useForm } from "../../shared/util/form-hook";
import { useHttpClient } from "../../shared/util/http-hook";
import { AuthenticationContext } from "../../shared/util/authentication-context";
import pour from "../../shared/Images/pour.jpg";
import "./Authentication.css";

const Authentication = () => {
  const authCtx = useContext(AuthenticationContext);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchAuthenticationHandler = (event) => {
    event.preventDefault();
    if (!showLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setShowLogin((prevMode) => !prevMode);
  };

  const openAuthenticationHandler = () => {
    setShowModal(true);
  };
  const closeAuthenticationHandler = () => {
    setShowModal(false);
  };

  const authenticationSubmitHandler = async (event) => {
    event.preventDefault();

    if (!showLogin) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/sign-up",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authCtx.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        authCtx.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showModal}
        onCancel={closeAuthenticationHandler}
        contentClass="place-item__modal-content"
        footerClass="landing-page_signup_button"
        footer={
          <React.Fragment>
{/*             <Link to="/logbook" > */}
              <Button type="submit" disabled={!formState.isValid} inverse>
                {!showLogin ? "SIGN UP " : "LOGIN"}
              </Button>
{/*             </Link> */}
            <h4 className="account">
              {!showLogin
                ? "Already have an account?"
                : "Don't have an account yet?"}
            </h4>
            <h4>
              <button onClick={switchAuthenticationHandler}>
                {!showLogin ? "LOG IN" : "SIGN UP"}
              </button>{" "}
              instead.
            </h4>
          </React.Fragment>
        }
        onSubmit={authenticationSubmitHandler}
      >
        <React.Fragment>
          {isLoading && <LoadingSpinner asOverlay />}
          {!showLogin && (
            <Input
              element="input"
              id="name"
              type="text"
              placeholder="Name:"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            placeholder="Email:"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            placeholder="Password:"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
        </React.Fragment>
      </Modal>
      <motion.div className="landing-page">
        <div className="introduction">
          <h1>Good👌Pour</h1>
          <h3 className="landing-statement">
            Whether you appreciate a slow hand brew, or are excited to master
            the art of the perfect flat white, it’s always important to keep
            track of what went right and what <span>didn’t</span>.
          </h3>
          <Button onClick={openAuthenticationHandler}>GET STARTED</Button>
          {/*  <h4 className="account">Already have an account?</h4>
          <h4>
            <button onClick={openAuthenticationHandler}>LOG IN</button> instead.
          </h4> */}
        </div>
        <div className="introduction_image">
          <img src={pour} alt="Filter Coffee" />
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Authentication;
