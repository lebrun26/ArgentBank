// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { setToken } from "../actions/login.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Modale_Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ENG: Function for login
  // FR: Fonction pour le login
  const handleLogin = async (event) => {
    event.preventDefault();

    // ENG: Retrieving user entered values
    // FR: Récupération des valeurs saisies par l'utilisateur
    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password]").value;

    // ENG: Checking input data
    // FR: Vérification des données d'entrée
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

    // ENG: Creating the object to send
    // FR: Création de l'objet à envoyer
    const login = { email, password };

    // ENG: Calling the fetch function with the necessary information
    // FR: Appel de la fonction fetch avec les informations nécessaires
    const reponse = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (reponse.status === 200) {
      const data = await reponse.json();
      const token = data.body.token;
      dispatch(setToken(token));

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else if (!rememberMe) {
        sessionStorage.setItem("token", token);
      }
      if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
        navigate("/user");
      }
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

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
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
