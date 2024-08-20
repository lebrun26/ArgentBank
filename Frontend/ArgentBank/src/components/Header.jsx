// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearToken } from "../actions/login.action";
import { setUser } from "../actions/user.action";

const Header = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const user = useSelector((state) => state.userReducer.user);
  const username = user ? user.userName : "User";
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
  // Redirection vers la page User
  const handleUser = (event) => {
    event.preventDefault();
    navigate("/user");
  };

  // Appel fetch du profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
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
          if (reponseProfile.status === 200) {
            const data = await reponseProfile.json();
            dispatch(setUser(data.body));
          } else {
            console.error("Erreur lors de la récupération du profil");
          }
        } catch (error) {
          console.error("Erreur : ", error);
        }
      }
    };
    fetchProfile();
  }, [token, dispatch]); // On refait la requete si le token change et mon met disptach en tant que dépendance

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
            <a className="main-nav-item" href="/login">
              <i className="fa fa-user-circle"></i>
              <span> Sign In</span>
            </a>
          ) : (
            <>
              <a className="main-nav-item" onClick={handleUser}>
                <i className="fa fa-user-circle"></i>
                <span> {username}</span>
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
