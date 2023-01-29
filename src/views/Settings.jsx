import React, { useEffect, useState } from "react";
import AdminsTable from "components/Tables/AdminsTable";
import AdminProfileCard from "components/cards/AdminProfileCard";
import { checkAuth } from "api/auth";
import HistoryTable from "components/Tables/HistoryTable";

function Settings() {
  const [sector, setSector] = useState("profile");
  const [isadmin, setIsAdmin] = useState(false);

  const refreshToken = async () => {
    const isAuth = await checkAuth();
    setIsAdmin(isAuth?.is_admin)
  }
  useEffect(() => {
    refreshToken();
  }, [])

  const loadCard = () => {
    switch (sector) {
      case "profile":
        return <AdminProfileCard />
      case "admins":
        return <AdminsTable />
      case "history":
        return <HistoryTable />
      default:
        break;
    }
  }

  return (
    <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
      {
        isadmin &&
        <div className="row  mb-4 " style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50px", }}>
          <i onClick={() => { setSector("profile") }} style={sector === "profile" ? { color: "black" } : { cursor: "pointer", color: "gray" }} className={`fa fa-user mr-5 fa-2x ${sector === "profile" && 'fa-3x'}`}></i>
          <i onClick={() => { setSector("admins") }} style={sector === "admins" ? { color: "black" } : { cursor: "pointer", color: "gray" }} className={`fa fa-user-secret mr-5 fa-2x ${sector === "admins" && 'fa-3x'}`}></i>
          <i onClick={() => { setSector("history") }} style={sector === "history" ? { color: "black" } : { cursor: "pointer", color: "gray" }} className={`fa fa-history mr-5 fa-2x ${sector === "history" && 'fa-3x'}`}></i>
        </div>
      }
      <div className="row h-75 w-100">
        <div className="col-md-12">
          {loadCard()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
