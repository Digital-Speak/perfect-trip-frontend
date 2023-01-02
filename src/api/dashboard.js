const getCircuit = async (path = "", method = "GET") => {
 const payload = await fetch(`http://localhost:8000/${path}`, {
  method: method,
  headers: {
   "content-Type": "application/json",
   origin: `http://localhost:8000`,
   authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvdXphbC5zYWlkM0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI1MjQ5ODUsImV4cCI6MTY3MjUyODU4NX0.LYlWp9z98297t8w9qTikIcD73A6OtE0rZhsNrgVirqU"}`
  }
 });
 return await payload.json();
}

const postData = async (path = "", method = "POST", body) => {
 const payload = await fetch(`http://localhost:8000/${path}`, {
  method: method,
  headers: {
   "content-Type": "application/json",
   origin: `http://localhost:8000`,
   authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvdXphbC5zYWlkM0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI1MjQ5ODUsImV4cCI6MTY3MjUyODU4NX0.LYlWp9z98297t8w9qTikIcD73A6OtE0rZhsNrgVirqU"}`
  },
  body: JSON.stringify(body)
 });
 return await payload.json();
}

export {
  getCircuit, 
 postData
}