import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import "./Products.css";
import { DataGrid } from "@mui/x-data-grid";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name",width: 200,
    renderCell: (params) => (
      <Link style={{ textDecoration: "none" }}  to={`/dashboard/admin/product/${params.row.name}`}>
        {params.value}
      </Link>
    ), 
  },
    { field: "category", headerName: "Category" ,width: 150 },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
  ];

  const rows = products.map((product, index) => ({
    id: index + 1,
    name: product.name,
    category: product.category.name,
    price: `${product.price}$`,
    quantity: product.quantity,
  }));

  return (
    <div className="row">
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <h3 className="text-center">All Products List</h3>
        <div className="d-flex flex-wrap">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid 
            columns={columns} 
            rows={rows} 
            pageSize={3}
            rowsPerPageOptions={[3]}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
