// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearToken } from "../actions/login.action";

const Header = async () => {
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
  // Redirection vers la page Home
  const handleHome = (event) => {
    event.preventDefault();
    navigate("/");
  };

  // Appel fetch du profile
  const reponseProfile = await fetch(
    "http://localhost:3001/api/v1/user/profile",
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: null,
    }
  );
  console.log(reponseProfile);

  return (
    <header>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src="/images/argentBankLogo.png"
            alt="logo de l'entreprise ArgentBank"
            onClick={handleHome}
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
            <>
              <a className="main-nav-item signIn" href="/login">
                <i className="fa fa-user-circle"></i>
                <span> Sign In</span>
              </a>
              <a className="main-nav-item signOut" onClick={handleSignOut}>
                <i className="fa fa-sign-out" />
                Sign Out
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
