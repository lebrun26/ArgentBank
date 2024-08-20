// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUsername } from "../actions/user.action";

const Modale_Balance = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.loginReducer.token);
  const username = user?.userName || "User";
  const lastName = user?.lastName || "Last Name";
  const firstName = user?.firstName || "First Name";

  // Pour le formulaire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUsername = async (event) => {
    event.preventDefault();

    // Recuperation de la valeur saisi par l'utilisateur
    const userName = event.target.querySelector("[name=username]").value;

    // Vérification de la donnée d'entrée
    if (!userName) {
      const errorMessage = document.querySelector(".error_message");
      if (!errorMessage.querySelector(".error_message_edit")) {
        const p = document.createElement("p");
        p.className = "error_message_edit";
        p.textContent = "User Name invalide ou manquant";
        errorMessage.appendChild(p);
      }
      return;
    }

    // Création de l'Objet à envoyer
    const editUsernamePush = { userName };

    // Appel de la fonction fetch avec les informations nécessaires
    const reponseEdit = await fetch(
      "http://localhost:3001/api/v1/user/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
        body: JSON.stringify(editUsernamePush),
      }
    );
    if (reponseEdit.status === 200) {
      const data = await reponseEdit.json();
      const newUsername = data.body.userName;
      dispatch(editUsername(newUsername));
      console.log("La modif : ", data);
    } else {
      const errorMessage = document.querySelector(".error_message");
      if (!errorMessage.querySelector("error_message_edit")) {
        const p = document.createElement("p");
        p.className = "error_message_edit";
        p.textContent = "User Name invalid ou manquant";
        errorMessage.appendChild(p);
      }
    }
  };

  return (
    <>
      <div className="header">
        <h1>
          Welcome back <br />
          {username} !
        </h1>
        <button className="edit-button" onClick={openModal}>
          Edit Name
        </button>
      </div>
      {/* Formulaire pour changement du username */}
      <div
        className={`container_edit_username ${isModalOpen ? "open" : "closed"}`}
      >
        <form className="form_edit_username" onSubmit={handleUsername}>
          <label htmlFor="username">
            User Name:
            <input type="text" name="username" defaultValue={username} />
          </label>
          <label htmlFor="first_name">
            First Name :
            <input type="text" name="first_name" value={firstName} readOnly />
          </label>
          <label htmlFor="last_name">
            Last Name :
            <input type="text" name="last_name" value={lastName} readOnly />
          </label>
          <div className="error_message"></div>

          <div className="btn_edit_username">
            <button type="submit" className="btn_save">
              Save
            </button>
            <button type="button" className="btn_cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349) </h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712) </h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349) </h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
};

export default Modale_Balance;
