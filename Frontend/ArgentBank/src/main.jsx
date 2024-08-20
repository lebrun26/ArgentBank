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

// Redux Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Configuration de Redux Persist
const persistConfig = {
  key: "root",
  storage,
};

// Application de Redux Persist a la racine
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux avec le réducteur persistant
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(thunk),
  devTools: true,
});

// Création du persist
const persistor = persistStore(store);

const container = document.getElementById("root");

const root = createRoot(container);

// Les actions
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
