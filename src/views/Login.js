import React, { useState } from "react";
import 'assets/demo/login.css'
function User() {
 const [newClient, setNewClient] = useState({
  firstName: "Jhon",
  lastName: "Doe",
  emailAddress: "jhon.doe@gmail.com",
  phoneNumber: "+33 30299320239",
  sexe: "homme",
  nationality: "",
  memo: "Cette personne a des besoins particuliers..."
 });

 return (
  <>
   <div className="loginPage">
    <div className="sideImage"></div>
    <div className="LoginForm"></div>
   </div>
  </>
 );
}

export default User;
