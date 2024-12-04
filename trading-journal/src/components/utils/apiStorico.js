const API_BASE_URL = "http://localhost:3001/api/report";

// Recupera tutti i report mensili di un utente
export const getReportMensiliByUserId = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero dei report mensili.");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante il recupero dei report mensili:", error);
    throw error;
  }
};

// Genera il report mensile per un utente
export const generaReportMensile = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genera/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante la generazione del report mensile.");
    }

    return await response.text();
  } catch (error) {
    console.error("Errore durante la generazione del report mensile:", error);
    throw error;
  }
};

// Elimina un report mensile
export const deleteReportMensile = async (reportId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${reportId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del report mensile.");
      }
  
      return await response.text();
    } catch (error) {
      console.error("Errore durante l'eliminazione del report mensile:", error);
      throw error;
    }
  };
