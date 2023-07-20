import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import { DataGrid } from "@mui/x-data-grid";

const SC = ({data}) => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "avis", headerName: "Avis", width: 200 },
    { field: "sentiment", headerName: "Sentiment", width: 150 },
    { field: "produit", headerName: "Produit", width: 150 },
  ];

  return (
    <div className="row">
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <h2 style={{ marginTop: 50, marginLeft: 50 }}>Avis</h2>
        <div style={{ height: 400, width: "80%" }}>
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

export default SC;
