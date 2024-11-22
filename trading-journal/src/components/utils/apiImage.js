// apiImage.js
export const uploadProfileImage = async (id, formData) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`http://localhost:3001/api/auth/${id}/uploadImage`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData, // Invia il FormData contenente l'immagine
  });

  if (!response.ok) {
    throw new Error("Errore nel caricamento dell'immagine");
  }

  return response.json();
};



  