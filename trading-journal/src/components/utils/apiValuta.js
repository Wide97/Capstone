
const API_BASE_URL = "http://localhost:3001/api/auth";

// Funzione per aggiornare la valuta dell'utente
export const aggiornaValuta = async (userId, nuovaValuta, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/valuta/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(nuovaValuta),
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

// Funzione per ottenere la valuta preferita dell'utente (opzionale, se necessaria)
export const getValutaPreferita = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/valuta/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
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
