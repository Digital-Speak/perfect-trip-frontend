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

export {
  getCities,
}