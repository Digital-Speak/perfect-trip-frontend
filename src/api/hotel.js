const getHotels = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}hotel`, {
    headers: {
      "content-Type": "application/json",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
    },
    credentials: "include"
  });
  return await payload.json();
}

const editHotelApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}hotel/edit`, {
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

const deleteHotelApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}hotel/delete`, {
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

const addHotelApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}hotel/add`, {
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
  getHotels,
  editHotelApi,
  addHotelApi,
  deleteHotelApi
}