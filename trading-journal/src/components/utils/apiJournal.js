export const createTrade = async (tradeData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:3001/api/trades/createTrade", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tradeData),
    });

    if (!response.ok) {
      throw new Error("Errore nella creazione del trade");
    }

    // Assicurati che la risposta sia in formato JSON
    const data = await response.json();

    return data;  // La risposta JSON contiene ora i dati (message, tradeId, ecc.)
  } catch (error) {
    console.error("Errore nella creazione del trade:", error);
    throw error;
  }
};


  


  