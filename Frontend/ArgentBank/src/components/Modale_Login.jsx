// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { setToken } from "../actions/login.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Modale_Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fonction pour le login
  const handleLogin = async (event) => {
    event.preventDefault();

    // Récupération des valeurs saisies par l'utilisateur
    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password]").value;

    // Vérification des données d'entrée
    if (!email || !password) {
      const loginError = document.querySelector(".loginError");
      if (!loginError.querySelector(".error-message")) {
        const p = document.createElement("p");
        p.className = "error-message";
        p.textContent = "Email et/ou Mot de passe incorrect";
        loginError.appendChild(p);
      }
      return;
    }

    // Création de l'objet à envoyer
    const login = { email, password };

    // Appel de la fonction fetch avec les informations nécessaires
    const reponse = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (reponse.status === 200) {
      const data = await reponse.json();
      const token = data.body.token;
      dispatch(setToken(token));
      sessionStorage.setItem("token", token);

      if (rememberMe) {
        localStorage.setItem("token", token);
      }

      navigate("/user");
    } else {
      const loginError = document.querySelector(".loginError");
      if (!loginError.querySelector(".error-message")) {
        const p = document.createElement("p");
        p.className = "error-message";
        p.textContent = "Email et/ou Mot de passe incorrect";
        loginError.appendChild(p);
      }
    }
  };

  // Système de logout
  const logOut = () => {
    const btnLoginOut = document.querySelector(".signInOut");
    const storedToken = window.localStorage.getItem("token");
    const sessionToken = window.sessionStorage.getItem("token");

    btnLoginOut?.addEventListener("click", () => {
      if (storedToken) {
        window.localStorage.removeItem("token");
        btnLoginOut.textContent = "Login";
        window.location.reload();
      } else if (sessionToken) {
        window.sessionStorage.removeItem("token");
        btnLoginOut.textContent = "Login";
      } else {
        window.location.href = "/";
      }
    });
  };

  logOut();

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1 className="signInOut">Sign In</h1>
      <form className="form_login" onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className="loginError"></div>
        <button className="sign-in-button" type="submit">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Modale_Login;
