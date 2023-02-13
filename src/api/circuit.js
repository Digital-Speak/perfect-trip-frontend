const addCiruitApi = async (body) => {
 try {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}circuit/add`, {
   method: "POST",
   headers: {
    "content-Type": "application/json",
    origin: `${process.env.REACT_APP_CLIENT_URL}`,
    authorization: `Bearer ${sessionStorage.getItem('jat')}`
   },
   credentials: "include",
   body: JSON.stringify(body)
  });
  return await payload.json();
 } catch (error) { }
}

export {
 addCiruitApi
}
