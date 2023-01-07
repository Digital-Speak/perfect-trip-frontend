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
        sessionStorage.setItem('user',JSON.stringify(data?.data));
        return {
          is_admin:data?.data?.is_admin,
          success:true
        }
      }
      return {
        success:false
      }
    });
    return isAuth; 
  } catch (error) {
    return {
      success:false
    }
  }
}

const logout = async (body) => {
  try {
    const payload = await fetch(`${process.env.REACT_APP_API_URL}user/logout`, {
      method: "POST",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      headers: {
        "content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    return await payload.json();
  } catch (error) {
    return error;
  }
}

const forgotPassword = async (body) => {
  try {
    const payload = await fetch(`${process.env.REACT_APP_API_URL}user/forgotpassword`, {
      method: "POST",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem('jat')}`
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    return await payload.json();
  } catch (error) {
    return error;
  }
}

const saveNewPassword = async (body) => {
  try {
    const payload = await fetch(`${process.env.REACT_APP_API_URL}user/setnewpassword`, {
      method: "POST",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem('jat')}`
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    return await payload.json();
  } catch (error) {
    return error;
  }
}

const getlastId = async () => {
  try {
    const payload = await fetch(`${process.env.REACT_APP_API_URL}dossier/getlast`, {
      method: "GET",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem('jat')}`
      },
      credentials: "include",
    });
    return await payload.json();
  } catch (error) {
    return error;
  }
}

const getAdmins = async () => {
  try {
    const payload = await fetch(`${process.env.REACT_APP_API_URL}user`, {
      method: "GET",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem('jat')}`
      },
      credentials: "include",
    });
    return await payload.json();
  } catch (error) {
    return error;
  }
}

const deleteAdminApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}user/delete`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      authorization: `Bearer ${sessionStorage.getItem('jat')}`
    },
    body: JSON.stringify(body)
  });
  return await payload.json();
}

const addSubAdminApi = async (body) => {
  const payload = await fetch(`${process.env.REACT_APP_API_URL}user/signup`, {
    method: "POST",
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
  login,
  checkAuth,
  logout,
  getlastId,
  getAdmins,
  forgotPassword,
  saveNewPassword,
  deleteAdminApi,
  addSubAdminApi
}