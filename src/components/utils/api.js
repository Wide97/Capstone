const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
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
