export const updateUser = async (id, newUsername, newPassword) => {
  const token = localStorage.getItem("token");
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/auth`;
  
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: newUsername,
      password: newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Errore nell'aggiornamento dei dati.");
  }

  const updatedData = await response.json();

  if (updatedData.newToken) {
    localStorage.setItem("token", updatedData.newToken);
  }

  return updatedData;
};
