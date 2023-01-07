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
 return await payload.json();
}

const updateDossier = async (body) => {
 const payload = await fetch(`${process.env.REACT_APP_API_URL}dossier/`, {
  method: "PUT",
  headers: {
   "content-Type": "application/json",
   origin: `${process.env.REACT_APP_CLIENT_URL}`,
   authorization: `Bearer ${sessionStorage.getItem('jat')}`
  },
  body: JSON.stringify(body)
 });
 return await payload.json();
}

const getOneDossier = async (body) => {
 const payload = await fetch(`${process.env.REACT_APP_API_URL}dossier/one`, {
  method: "POST",
  headers: {
   "content-Type": "application/json",
   origin: `${process.env.REACT_APP_CLIENT_URL}`,
   authorization: `Bearer ${sessionStorage.getItem('jat')}`
  },
  body: JSON.stringify(body)
 });
 return await payload.json();
}

const getDossier = async (body) => {
 const payload = await fetch(`${process.env.REACT_APP_API_URL}dossier/`, {
  method: "POST",
  headers: {
   "content-Type": "application/json",
   origin: `${process.env.REACT_APP_CLIENT_URL}`,
   authorization: `Bearer ${sessionStorage.getItem('jat')}`
  },
  body: JSON.stringify(body)
 });
 return await payload.json();
}

export {
 addNewDossier,
 updateDossier,
 getDossier,
 getOneDossier
}