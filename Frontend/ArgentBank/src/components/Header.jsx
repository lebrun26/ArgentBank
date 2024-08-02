// eslint-disable-next-line no-unused-vars
import React from "react";

const Header = () => {
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
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            <span> Sign In</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
