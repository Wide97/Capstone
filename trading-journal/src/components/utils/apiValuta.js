const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

// Funzione per aggiornare la valuta preferita dell'utente
export const aggiornaValuta = async (userId, valutaId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/valuta/utente/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ valutaId }),
    });

    if (!response.ok) {
      throw new Error("Errore durante l'aggiornamento della valuta");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante l'aggiornamento della valuta:", error);
    throw error;
  }
};

// Funzione per ottenere tutte le valute disponibili
export const getAllValute = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/valuta`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero delle valute");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante il recupero delle valute:", error);
    throw error;
  }
};

// Funzione per ottenere la valuta preferita dell'utente
export const getValutaUtente = async (userId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/utente/${userId}/valuta`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Errore durante il recupero della valuta preferita dell'utente"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Errore durante il recupero della valuta preferita dell'utente:",
      error
    );
    throw error;
  }
};
