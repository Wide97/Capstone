const API_BASE_URL = "http://localhost:3001/api";

// Funzione per ottenere il capitale dell'utente
export const getCapitaleByUserId = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/capitale/utente/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero del capitale dell'utente");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante il recupero del capitale dell'utente:", error);
    throw error;
  }
};

// Funzione per impostare il capitale iniziale dell'utente
export const setCapitaleIniziale = async (userId, capitaleIniziale, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/capitale/utente/${userId}/iniziale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ capitaleIniziale }),
    });

    if (!response.ok) {
      throw new Error("Errore durante l'impostazione del capitale iniziale");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante l'impostazione del capitale iniziale:", error);
    throw error;
  }
};

// Funzione per ricalcolare il capitale attuale in base ai trade dell'utente
export const ricalcolaCapitale = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/capitale/utente/${userId}/ricalcola`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il ricalcolo del capitale");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante il ricalcolo del capitale:", error);
    throw error;
  }
};

