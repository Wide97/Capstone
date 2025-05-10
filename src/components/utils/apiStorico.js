const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/report`;

// Funzione per ottenere tutti i report mensili di un utente
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
      throw new Error("Errore nel recupero dei report mensili.");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante il recupero dei report mensili:", error);
    throw error;
  }
};

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
      if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Report già generato.");
      }

      const errorDetails = await response.text();
      console.error("Errore dettagliato:", errorDetails);
      throw new Error("Errore nella generazione del report mensile.");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Errore durante la generazione del report mensile:", error);
    throw error;
  }
};

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
      const errorDetails = await response.text();
      console.error("Errore dettagliato:", errorDetails);
      throw new Error("Errore durante l'eliminazione del report mensile.");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore durante l'eliminazione del report mensile:", error);
    throw error;
  }
};
