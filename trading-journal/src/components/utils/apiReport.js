const API_URL = "http://localhost:3001/api"; 

// Funzione per ottenere tutti i trade di un utente
export const getAllTrades = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/trades/user/${userId}/trades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei trade");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore nella chiamata per ottenere i trade:", error);
    throw error;
  }
};

// Funzione per eliminare un trade
export const deleteTrade = async (tradeId, userId) => {
  try {
    const response = await fetch(`${API_URL}/trades/${tradeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.log("Response error:", response); 
      throw new Error("Errore nell'eliminazione del trade");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore nella chiamata per eliminare il trade:", error); 
    throw error;
  }
};








  
