import { useRef, useState } from "react";

import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { headersAction } from "../../store/redux-store";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Redux functions
  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (isLogin) {
      let url = "http://localhost:8080/login";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        if (res.ok) {
          res.json().then((data) => {
            const tokenHeader = data.Authorization;
            const userHeader = data.Authenticated;
            dispatch(
              headersAction.setHeaderOnLogin({
                Authenticated: userHeader,
                Authorization: tokenHeader,
              })
            );
            navigate("/profile", { replace: true });
          });
        } else {
          setIsLogin(false);
          console.log("Problema con il login");
        }
      });
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" id="username" required ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
