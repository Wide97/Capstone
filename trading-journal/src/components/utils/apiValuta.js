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
      body: JSON.stringify(nuovaValuta), // Invio la valuta come stringa
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
