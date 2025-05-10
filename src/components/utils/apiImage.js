export const uploadProfileImage = async (id, formData) => {
  const token = localStorage.getItem("token");
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

  const response = await fetch(`${API_BASE_URL}/${id}/uploadImage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Errore nel caricamento dell'immagine");
  }

  const updatedProfileResponse = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!updatedProfileResponse.ok) {
    throw new Error("Errore nel recupero dei dati dell'utente");
  }

  const updatedData = await updatedProfileResponse.json();

  if (updatedData.newToken) {
    localStorage.setItem("token", updatedData.newToken);
  }

  return updatedData;
};
