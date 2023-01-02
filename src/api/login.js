const login = async (body) => {
  try {
    const payload = await fetch(`${process.env.REACT_APP_API_URL}user/login`, {
      method: "POST",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      headers: {
        "content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    return await payload.json();
  } catch (error) {
    return error;
  }

}

const checkAuth = async () => {
  try {
    const isAuth = await fetch(`${process.env.REACT_APP_API_URL}refreshtoken`, {
      method: "POST",
      headers: {
        origin: `${process.env.REACT_APP_CLIENT_URL}`,
        "content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => response.json())
    .then((data) => {
      if(data?.success){
        sessionStorage.setItem('jat',data?.accessToken);
        return true;
      }
      return false;
    });
    return isAuth; 
  } catch (error) {
    return false;
  }
}

export {
  login,
  checkAuth
}