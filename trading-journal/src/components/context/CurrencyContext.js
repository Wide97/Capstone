import React, { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    // Recupera la valuta preferita dell'utente quando il componente si monta
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrency(data.valuta || "USD");
        })
        .catch((error) => console.error("Errore nel recupero della valuta:", error));
    }
  }, []);

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);

    // Aggiorna la valuta preferita dell'utente nel backend
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      fetch(`http://localhost:3001/api/users/valuta/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newCurrency),
      }).catch((error) => console.error("Errore nell'aggiornamento della valuta:", error));
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
