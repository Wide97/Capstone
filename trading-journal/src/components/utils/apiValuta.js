const API_BASE_URL = "http://localhost:3001/api";

// Funzione per aggiornare la valuta preferita dell'utente
export const aggiornaValuta = async (userId, valutaId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/valuta/utente/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ valutaId }), // Il payload che contiene l'ID della valuta da aggiornare
    });

    if (!response.ok) {
      throw new Error("Errore durante l'aggiornamento della valuta");
    }

    return await response.json(); // Restituisce il risultato dell'aggiornamento
  } catch (error) {
    console.error("Errore durante l'aggiornamento della valuta:", error);
    throw error;
  }
};

// Funzione per ottenere la valuta preferita dell'utente
export const getValutaPreferita = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/valuta/utente/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero della valuta preferita");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Errore durante il recupero della valuta preferita:", error);
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
