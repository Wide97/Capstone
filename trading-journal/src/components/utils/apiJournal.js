export const createTrade = async (tradeData) => {
    const token = localStorage.getItem("token");
  
    const mappedTradeData = {
      ...tradeData,
      result: tradeData.result.toUpperCase().replace(" ", "_"), 
      asset: tradeData.asset.replace("/", "_"), 
    };
  
    try {
      const response = await fetch("http://localhost:3001/api/trades/createTrade", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedTradeData),
      });
  
      if (!response.ok) {
        throw new Error(`Errore nella creazione del trade: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Trade creato:', data); 
      return data;
  
    } catch (error) {
      console.error('Errore nel frontend:', error);
      throw new Error("Errore nella creazione del trade");
    }
  };
  
  


  