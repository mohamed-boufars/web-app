import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const Avis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pfe");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "avis", headerName: "Comment",  flex: 1},
    { field: "sentiment", headerName: "Sentiment", width: 150 },
    { field: "produit", headerName: "Product", width: 150 },
  ];

  return (
  <div className="row">
      <div className="col-md-3">
            <Sidebar />
        </div>
      <div className="col-md-9">
        <h2 style={{ marginTop: 50,marginLeft:50}}>Comments</h2>
        <div style={{ height: 400, width: "95%" }}>
          <DataGrid 
          rows={data} 
          columns={columns} 
          pageSize={3}
          rowsPerPageOptions={[3]}
          checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Avis;
