// eslint-disable-next-line no-unused-vars
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./designs/css/main.css";

// Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index.jsx";
import { thunk } from "redux-thunk";

//Obtention du conteneur DOM
const container = document.getElementById("root");

// Création de la racine
const root = createRoot(container);

// Création du store Redux
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

// Les actions

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
