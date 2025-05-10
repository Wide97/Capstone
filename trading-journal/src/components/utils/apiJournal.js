export const createTrade = async (tradeData) => {
  const token = localStorage.getItem("token");
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/trades`;

  try {
    const response = await fetch(`${API_BASE_URL}/createTrade`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tradeData),
    });

    if (!response.ok) {
      throw new Error("Errore nella creazione del trade");
    }

    const data = await response.json();
    return data;  
  } catch (error) {
    console.error("Errore nella creazione del trade:", error);
    throw error;
  }
};
