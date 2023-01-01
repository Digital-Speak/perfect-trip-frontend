 const login = async (path = "", method = "POST", body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
   method: method,
   headers: {
    "content-Type": "application/json",
  },
   body: JSON.stringify(body)
  });
  return await payload.json();
 }

 const checkAuth = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}user/checkauth`, {
   method: "GET",
   headers: {
    "content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem('jwt')}`
  },
  });
  return await payload.json();
 }
 
 export {
  login,
  checkAuth
 }