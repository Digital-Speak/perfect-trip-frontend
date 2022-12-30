const fetchData = async (path = "", method = "get") => {
 const payload = await fetch(`http://localhost:8000/${path}`, {
   method: method,
   credentials: "include",
   headers: {
    "content-Type": "application/json",
    origin: `http://localhost:3000`,
    authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvdXphbC5zYWlkM0BnbWFpbC5jb20iLCJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI0MDE4MDMsImV4cCI6MTY3MjQwNTQwM30.ZF3I_Qn_-qUmMkmTnruuqb0WeUNrnY5nQjPPLDsNJ8o"}`
   }
 });
 console.log(await payload.json());
 return await payload.json();
}

export {
 fetchData
}