import React from "react";
import axios from "axios"; // Import axios library
import useUser from "../../hooks/useUser";
import "./Users.css"; // Import the CSS file
import Sidebar from "../../components/Layout/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify"; // Import toast for displaying notifications


const Users = () => {
  const users = useUser();

  function Type(r) {
    if (r === 1) {
      return "admin";
    } else {
      return "client";
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "status", headerName: "Status", width: 70 },
    { field: "name", headerName: "Name", width: 110 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "phone", headerName: "Phone", width: 110 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        const handleDelete = async (email) => {
          try {
            const { data } = await axios.delete(
              `/api/v1/user/delete-user/${email}`
            );
            if (data.success) {
            toast.success(`user is deleted`);
            window.location.reload();
            } else {
            toast.error(data.message);
            }
          } catch (error) {
            toast.error("Something went wrong");
          }
        };

        return (
          <button style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
          onClick={() => handleDelete(params.row.email)}
          className="delete-button">
            Delete
          </button>
        );
      },
    },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    status: Type(user.role),
    name: user.name,
    email: user.email,
    address:user.address,
    phone: user.phone,
    // Add more properties as needed
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h1>All Users</h1>
          <div style={{ height: 400, width: "98%" }}>
            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={4}
              rowsPerPageOptions={[4]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
