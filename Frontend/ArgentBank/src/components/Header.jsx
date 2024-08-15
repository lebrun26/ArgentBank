// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearToken } from "../actions/login.action";

const Header = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Fonction pour déconnecter l'utilisateur

  const handleSignOut = (event) => {
    event.preventDefault();
    // Suppression du token dans les 2 stores
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <header>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="/images/argentBankLogo.png"
            alt="logo de l'entreprise ArgentBank"
          ></img>
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {!token ? (
            <a className="main-nav-item signIn" href="/login">
              <i className="fa fa-user-circle"></i>
              <span> Sign In</span>
            </a>
          ) : (
            <a
              className="main-nav-item signOut"
              href="/"
              onClick={handleSignOut}
            >
              <i className="fa fa-sign-out" />
              Sign Out
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
