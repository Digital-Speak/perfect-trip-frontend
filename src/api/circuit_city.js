const getCiruitsApi = async () => {
 try {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}circuit_city`, {
   method: "GET",
   headers: {
    "content-Type": "application/json",
    origin: `${process.env.REACT_APP_CLIENT_URL}`,
    authorization: `Bearer ${sessionStorage.getItem('jat')}`
   },
   credentials: "include"
  });
  return await payload.json();
 } catch (error) {
  console.log(error)
 }
}

const addCiruitsApi = async (body) => {
 try {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}circuit_city`, {
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
 } catch (error) {
  console.log(error)
 }
}

export {
 getCiruitsApi,
 addCiruitsApi
}