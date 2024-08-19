// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Modale_Balance = () => {
  const user = useSelector((state) => state.userReducer.user);
  const username = user ? user.userName : "User";
  const lastName = user ? user.lastName : "Last Name";
  const firstName = user ? user.firstName : "First Name";
  console.log(username);

  // Pour le formulaire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
        <form className="form_edit_username">
          <label htmlFor="username">
            User Name:
            <input type="text" name="username" />
          </label>
          <label htmlFor="first_name">
            First Name :
            <input type="text" name="first_name" value={firstName} readOnly />
          </label>
          <label htmlFor="last_name">
            Last Name :
            <input type="text" name="last_name" value={lastName} readOnly />
          </label>
        </form>
        <div className="btn_edit_username">
          <button type="button" className="btn_save">
            Save
          </button>
          <button type="button" className="btn_cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
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
