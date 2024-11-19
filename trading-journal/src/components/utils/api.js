const BASE_URL = "http://localhost:3001/api/auth";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante il login.");
    }

    const token = await response.text(); 
    return token;
  } catch (error) {
    throw error; 
  }
};
