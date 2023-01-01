const getCircuit = async (path = "", method = "GET") => {
 const payload = await fetch(`http://localhost:8000/${path}`, {
  method: method,
  headers: {
   "content-Type": "application/json",
   origin: `http://localhost:8000`,
   authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvdXphbC5zYWlkM0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI0MTY2MDIsImV4cCI6MTY3MjQyMDIwMn0.0gjTH7FlQGZK_ifoG6WdGmN-dVbPsw0xGRI7zyimdys"}`
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
   authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvdXphbC5zYWlkM0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI0MTY2MDIsImV4cCI6MTY3MjQyMDIwMn0.0gjTH7FlQGZK_ifoG6WdGmN-dVbPsw0xGRI7zyimdys"}`
  },
  body: JSON.stringify(body)
 });
 return await payload.json();
}

export {
  getCircuit, 
 postData
}