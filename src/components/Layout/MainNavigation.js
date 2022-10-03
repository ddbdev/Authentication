import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { headersAction } from "../../store/redux-store";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkIfLogged = localStorage.getItem("Authorization") ? true : false;

  const logoutHandler = () => {
    dispatch(headersAction.setHeaderOnLogout({}));
    navigate("/auth", { replace: true });
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!checkIfLogged && <Link to="/auth">Login</Link>}</li>
          <li>{checkIfLogged && <Link to="/profile">Profile</Link>}</li>
          <li>
            {checkIfLogged && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
