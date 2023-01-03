const getAgencies = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}agency`, {
    headers: {
      "content-Type": "application/json",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
    },
    credentials: "include"
  });
  return await payload.json();
}

const editAgencyApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}agency/edit`, {
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

const deleteAgencyApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}agency/delete`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
    },
    body: JSON.stringify(body)
  });
  return await payload.json();
}

const addAgencyApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}agency/add`, {
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
  getAgencies,
  editAgencyApi,
  addAgencyApi,
  deleteAgencyApi
}