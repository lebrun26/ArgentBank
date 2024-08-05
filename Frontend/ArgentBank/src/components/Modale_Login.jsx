// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router";

const Modale_Login = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Fonction pour le login

  function sendLogin() {
    const formulaireLogin = document.querySelector(".form_login");
    formulaireLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      // Récupération des valeurs saisie par l'utilisateur
      const username = e.target.querySelector("[name=username]");
      const password = e.target.querySelector("[name=password]");
      const checked = e.target.getElementById("remember-me");

      // Test si les données d'entrée son correct
      if (!username || !password) {
        const loginError = document.querySelector(".loginError");
        if (!loginError.querySelector(".error-message")) {
          const p = document.createElement("p");
          p.className = "error_message";
          p.textContent = "Email et/ou Mot de passe incorrect";
          loginError.appendChild(p);
        }
      }
      // Création de l'objet à envoyer
      const login = {
        username: username,
        password: password,
      };
      const chargeUtile = JSON.stringify(login);
      // Appel de la fonction fetch avec toutes les informations nécessaires
      const reponse = await;
    });
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form className="form_login">
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className="loginError"></div>
        <button
          className="sign-in-button"
          onClick={() => handleNavigate("/user")}
        >
          Sign In
        </button>
      </form>
    </section>
  );
};

export default Modale_Login;
