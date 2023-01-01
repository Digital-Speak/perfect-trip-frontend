import { getAccessToken } from "helpers/accessToken";

 const login = async (path = "", method = "POST", body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
   method: method,
   origin: `http://localhost:3000`,
   headers: {
    "content-Type": "application/json",
  },
  credentials:"include",
   body: JSON.stringify(body)
  });
  return await payload.json();
 }

 const checkAuth = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}refreshtoken`, {
   method: "POST",
   headers: {
   origin: `http://localhost:3000`,
    "content-Type": "application/json",
  },
  credentials:"include",
  });
  return await payload.json();
 }

 export {
  login,
  checkAuth
 }