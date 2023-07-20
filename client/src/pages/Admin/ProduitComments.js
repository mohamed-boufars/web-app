import React, { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import 'react-circular-progressbar/dist/styles.css';
import './P.css';
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/Layout/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  


const ProductC = () => {
  const [products, setProducts] = useState([]);
  const [comm,setComm]=useState([]);
  const [med,setMed]=useState('');
  const [avisCount, setAvisCount] = useState(0);
  const [posetive, setPosetive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [neutre, setNeutre] = useState(0);

  


  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleProductClick = async (productName) => {
    try {
      const response = await axios.get(`http://localhost:5000/pfe/${productName}`);
      const responseData = response.data;
      setComm(responseData);
      setMed(productName)
      const count = responseData.length;
      const positiveCount = responseData.filter((item) => item.sentiment === "posetive").length;
      const negativeCount = responseData.filter((item) => item.sentiment === "negative").length;
      const neutralCount = responseData.filter((item) => item.sentiment === "neutre").length;
      setPosetive(positiveCount);
      setNegative(negativeCount);
      setNeutre(neutralCount);
      setAvisCount(count);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch comments");
    }
  };
  const data = [
    { name: `positive ${((posetive*100)/avisCount).toFixed(2)}%`, Total: posetive},
    { name: `neutre ${((neutre*100)/avisCount).toFixed(2)}%`, Total: neutre},
    { name: `negative ${((negative*100)/avisCount).toFixed(2)}%`, Total: negative },
  ];
  const columns = [
    { field: "id", headerName: "ID" ,width: 50},
    { field: "name", headerName: "Name",width: 190,
    renderCell: (params) => (
      <div 
        className="product-name"
        style={{ cursor:'pointer'}}
        onClick={() => handleProductClick(params.value)}
      >
        {params.value}
      </div>
    )
  },
  ];
  const rows = products.map((product, index) => ({
    id: index + 1,
    name: product.name,
  }));
  return (
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
        <h3 className="text-center">Statistics</h3>
        <div className="nn">
          <div className="l">
            <div style={{ height: 400, width: 260}} className="d-flex flex-column">
              <DataGrid
                rows={rows}
                columns={columns}
                hideFooterPagination
                autoWidth
              />
            </div>
    <div className="chart">
      <div className="title">{med} statistics</div>
      <ResponsiveContainer width="99%" aspect={2/1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 60, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>

            </div>
            </div>
              </div>
            </div>
        
</div>
       
  );
};
export default ProductC;
