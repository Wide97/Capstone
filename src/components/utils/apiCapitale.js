const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

console.log("📌 API_BASE_URL:", API_BASE_URL);

// Funzione per ottenere il capitale dell'utente
export const getCapitaleByUserId = async (userId, token) => {
  try {
    const url = `${API_BASE_URL}/capitali/utente/${userId}`;
    console.log("🔍 GET Capitale URL:", url);
    console.log("🔑 Token:", token);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Response Status:", response.status);

    const result = await response.json();
    console.log("📦 Response Body:", result);

    if (!response.ok) {
      throw new Error("Errore durante il recupero del capitale dell'utente");
    }

    return result;
  } catch (error) {
    console.error("❌ Errore durante il recupero del capitale dell'utente:", error);
    throw error;
  }
};

// Funzione per impostare il capitale iniziale dell'utente
export const setCapitaleIniziale = async (userId, capitaleIniziale, token) => {
  try {
    const url = `${API_BASE_URL}/capitali/utente/${userId}/iniziale`;
    console.log("🔍 POST Capitale Iniziale URL:", url);
    console.log("📊 Capitale Iniziale:", capitaleIniziale);
    console.log("🔑 Token:", token);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ capitaleIniziale }),
    });

    console.log("📥 Response Status:", response.status);

    const result = await response.json();
    console.log("📦 Response Body:", result);

    if (!response.ok) {
      throw new Error("Errore durante l'impostazione del capitale iniziale");
    }

    return result;
  } catch (error) {
    console.error("❌ Errore durante l'impostazione del capitale iniziale:", error);
    throw error;
  }
};

// Funzione per ricalcolare il capitale attuale in base ai trade dell'utente
export const ricalcolaCapitale = async (userId, token) => {
  try {
    const url = `${API_BASE_URL}/capitali/utente/${userId}/ricalcola`;
    console.log("🔁 PUT Ricalcola Capitale URL:", url);
    console.log("🔑 Token:", token);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Response Status:", response.status);

    const result = await response.json();
    console.log("📦 Response Body:", result);

    if (!response.ok) {
      throw new Error("Errore durante il ricalcolo del capitale");
    }

    return result;
  } catch (error) {
    console.error("❌ Errore durante il ricalcolo del capitale:", error);
    throw error;
  }
};

// Funzione per ottenere il capitale attuale dell'utente
export const getCapitaleAttuale = async (userId, token) => {
  try {
    const url = `${API_BASE_URL}/capitali/utente/${userId}/attuale`;
    console.log("🔍 GET Capitale Attuale URL:", url);
    console.log("🔑 Token:", token);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Response Status:", response.status);

    const result = await response.json();
    console.log("📦 Response Body:", result);

    if (!response.ok) {
      throw new Error("Errore durante il recupero del capitale attuale dell'utente");
    }

    return result;
  } catch (error) {
    console.error("❌ Errore durante il recupero del capitale attuale dell'utente:", error);
    throw error;
  }
};

// Funzione per ottenere il capitale iniziale dell'utente
export const getCapitaleIniziale = async (userId, token) => {
  try {
    const url = `${API_BASE_URL}/capitali/utente/${userId}/iniziale`;
    console.log("🔍 GET Capitale Iniziale URL:", url);
    console.log("🔑 Token:", token);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Response Status:", response.status);

    const result = await response.json();
    console.log("📦 Response Body:", result);

    if (!response.ok) {
      throw new Error("Errore durante il recupero del capitale iniziale dell'utente");
    }

    return result;
  } catch (error) {
    console.error("❌ Errore durante il recupero del capitale iniziale dell'utente:", error);
    throw error;
  }
};
