const getListFlights = async () => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}flight`, {
   method: "GET",
   headers: {
    "content-Type": "application/json",
    origin: `${process.env.REACT_APP_CLIENT_URL}`,
    authorization: `Bearer ${sessionStorage.getItem('jat')}`
   },
  });
  return await payload.json();
 }
 
 export {
  getListFlights
 }