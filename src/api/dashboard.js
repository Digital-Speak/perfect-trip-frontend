const getCircuit = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}circuit`, {
    headers: {
      "content-Type": "application/json",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
    },
    credentials: "include"
  });
  return await payload.json();
}

const postData = async (path = "", method = "POST", body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    method: method,
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
  getCircuit,
  postData
}