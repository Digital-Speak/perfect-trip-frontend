const getCities = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}city`, {
    headers: {
      "content-Type": "application/json",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
    },
    credentials: "include"
  });
  return await payload.json();
}

const editCityApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}city/edit`, {
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

const deleteCityApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}city/delete`, {
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

const addCityApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}city/add`, {
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
  getCities,
  editCityApi,
  addCityApi,
  deleteCityApi
}