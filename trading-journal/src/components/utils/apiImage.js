const uploadProfileImage = async (id, file, token) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch(`http://localhost:3001/api/auth/${id}/uploadImage`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Errore durante il caricamento dell'immagine");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      return { error: "Errore durante il caricamento dell'immagine" };
    }
  };
  
  export default uploadProfileImage;
  