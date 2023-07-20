import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlined from "@mui/icons-material/HomeOutlined";


const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
      <div >
        <div  style={{display:"flex"}}>
          <div style={{ marginBottom:"30px",marginLeft:"20px",marginTop:"20px"}}>
        <h4 className="card-title"><PersonOutlinedIcon
                      className="icon"
            style={{
              height:'30px',
              width:'30px',
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              marginBottom:"10px",
            }}
          /></h4>
          <Link to="/dashboard/user/orders">
          <h4><ShoppingCartOutlinedIcon
            className="icon"
            style={{
              height:'30px',
              width:'30px',
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          /></h4></Link>
          <Link to="/">
          <h4><HomeOutlined
            className="icon"
            style={{
              height:'30px',
              width:'30px',
              backgroundColor: "rgb(50,205,50)",
              color: "green",
              marginBottom:"10px",
            }}
          /></h4></Link>
          </div>
          <div style={{marginLeft:"100px",marginTop:"50px",width:"700px"}}>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"><PersonOutlinedIcon
                      className="icon"
            style={{
              height:'30px',
              width:'30px',
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          /></h4>
                <form onSubmit={handleSubmit} >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="name"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="email"
                      placeholder="Enter Your Email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="phone"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="address"
                      placeholder="Enter Your Address"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
