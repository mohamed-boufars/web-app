import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [creationDates, setCreationDates] = useState({});
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
  
      // Store the creation dates in a separate object
      const dates = {};
      data.forEach(order => {
        dates[order._id] = order.createdAt;
      });
      setCreationDates(dates);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

 

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: "30px", marginLeft: "20px", marginTop: "20px" }}>
          <Link to="/dashboard/user">
            <h4 className="card-title">
              <PersonOutlinedIcon
                className="icon"
                style={{
                  height: '30px',
                  width: '30px',
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                  marginBottom: "10px",
                }}
              />
            </h4>
          </Link>
          <Link to="/dashboard/user/orders">
            <h4><ShoppingCartOutlinedIcon
              className="icon"
              style={{
                height: '30px',
                width: '30px',
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            /></h4>
          </Link>
          <Link to="/">
            <h4><HomeOutlined
              className="icon"
              style={{
                height: '30px',
                width: '30px',
                backgroundColor: "rgb(50,205,50)",
                color: "green",
                marginBottom: "10px",
              }}
            /></h4>
          </Link>
        </div>
        <div style={{ marginLeft: "100px", marginTop: "50px", width: "700px" }}>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(creationDates[o._id]).format("YYYY-MM-DD HH:mm:ss")}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o.products.length}</td> 
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
