import "./W.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreIcon from "@mui/icons-material/Store";
import axios from "axios";
import { useState, useEffect } from "react";

const Widget = ({ type }) => {
  const [user, setUser] = useState(0);
  const [order, setOrder] = useState(0);
  const [product, setProduct] = useState(0);


  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response= await axios.get("/api/v1/user/get-user");
        const count  = response.data.user.length
        setUser(count);
        const r= await axios.get("/api/v1/order/get-order");
        const count2 = r.data.order.length
        setOrder(count2);
        const p= await axios.get("/api/v1/product/get-product");
        const p2 = p.data.products.length
        console.log(p2)
        setProduct(p2);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCount();
  }, []);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        s:user,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              height:'30px',
              width:'30px',
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        s:order,
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              height:'30px',
              width:'30px',
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
      case "product":
      data = {
        title: "PRODUCTS",
        s:product,
        isMoney: false,
        link: "View all products",
        icon: (
          <StoreIcon
            className="icon"
            style={{
              height:'30px',
              width:'30px',
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    default:
      data = {
        title: "",
        isMoney: false,
        link: "",
        icon: null,
      };
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
            {data.s}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
