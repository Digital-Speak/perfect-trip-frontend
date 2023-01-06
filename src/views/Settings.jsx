import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import AdminsTable from "components/Tables/AdminsTable";


function Settings() {
  const { t } = useTranslation();
  const [sector, setSector] = useState("profile");

  const loadCard = () => {
    switch (sector) {
      case "profile":
        return <div>profile</div>
      case "admins":
        return <AdminsTable />
      default:
        break;
    }
  }

  return (
      <div className="content bg-white" style={{ "width": "90%",alignItems:"center", "marginLeft": "auto", "marginRight": "auto", height:"80vh", display:"flex" }}>
       <div className="row h-75 w-100">
        <div className="col-md-3 pt-5 border-right border-1 border-info">
          <button onClick={()=>{setSector("profile")}} className="form-control border-bottom border-top-0 border-left-0 border-right-0 border-1  border-info  text-left  btn-lg">
          <i className="fa fa-user mr-2"></i> Profile informations
          </button>
          <button onClick={()=>{setSector("admins")}} className="form-control border-bottom border-top-0 border-left-0 border-right-0 border-1  border-info  text-left  btn-lg mt-3">
          <i className="fa fa-user-secret mr-2"></i> Sub admins settings
          </button>  
          <button onClick={()=>{setSector("admins")}} className="form-control border-bottom border-top-0 border-left-0 border-right-0 border-1  border-info text-left btn-lg mt-3">
          <i className="fa fa-history mr-2"></i> History
          </button>  
        </div>
        <div className="col-md-9">
          {loadCard()}
        </div>
       </div>
      </div>
  );
}

export default Settings;
