const addNewDossier = async (body) => {
 const payload = await fetch(`${process.env.REACT_APP_API_URL}dossier/add`, {
  method: "POST",
  headers: {
   "content-Type": "application/json",
   origin: `${process.env.REACT_APP_CLIENT_URL}`,
   authorization: `Bearer ${sessionStorage.getItem('jat')}`
  },
  body: JSON.stringify(body)
 });
 console.log(body);
 return await payload.json();
}

export {
 addNewDossier
}