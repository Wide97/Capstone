
export const uploadProfileImage = async (id, formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3001/api/auth/${id}/uploadImage`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData, 
  });

  if (!response.ok) {
    throw new Error("Errore nel caricamento dell'immagine");
  }

  const updatedProfileResponse = await fetch("http://localhost:3001/api/auth/profile", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!updatedProfileResponse.ok) {
    throw new Error("Errore nel recupero dei dati dell'utente");
  }

  const updatedData = await updatedProfileResponse.json();
  return updatedData;
};



  