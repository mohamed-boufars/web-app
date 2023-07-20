import React from "react";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/Layout/Sidebar";
import Widget from "../../components/widget/Widjet";
import Featured from "../../components/feature/feature";
import "./Adashbord.css";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
  <div className="row">
      <div className="col-md-3">
            <Sidebar />
      </div>
      <div className="col-md-9">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="product" />
        </div>
        <Featured/>
      </div>
  </div>
   
  );
};

export default AdminDashboard;
