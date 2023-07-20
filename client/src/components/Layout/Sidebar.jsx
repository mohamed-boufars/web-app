import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CommentIcon from '@mui/icons-material/Comment';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddIcon from '@mui/icons-material/Add';
import { Link  } from "react-router-dom";
import { useAuth } from "../../context/auth";


const Sidebar = () => {
const [auth] = useAuth();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard/user" style={{ textDecoration: "none" }}>
          <span className="logo">{auth?.user?.name}</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard/admin" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/dashboard/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/orders" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
          <Link to="/dashboard/admin/avis" style={{ textDecoration: "none" }}>
          <li>
            <CommentIcon className="icon" />
            <span>Comments</span>
          </li>
          </Link>
          <Link to="/dashboard/admin/produit-comment" style={{ textDecoration: "none" }}>
          <li>
          <LeaderboardIcon className="icon" />
          <span>Statistics</span>
          </li>
          </Link>
          <p className="title">MANAGMENT</p>
          <Link
            to="/dashboard/admin/create-category"
            style={{ textDecoration: "none" }}
          >
            <li>
              <AddIcon className="icon"/>
            <span>Create Category</span> 
            </li>
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            style={{ textDecoration: "none" }}
          >
            <li>
              <AddIcon className="icon"/>
            <span>Create Product</span> 
            </li>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" style={{ fontSize: '1.4rem'}} />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
