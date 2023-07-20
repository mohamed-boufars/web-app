import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import 'react-circular-progressbar/dist/styles.css';
import './feature.css';

const Featured = () => {
  const [avisCount, setAvisCount] = useState(0);
  const [posetive, setPosetive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [neutre, setNeutre] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pfe");
      const avisData = response.data;
      const count = avisData.length;
      const positiveCount = avisData.filter((item) => item.sentiment === "posetive").length;
      const negativeCount = avisData.filter((item) => item.sentiment === "negative").length;
      const neutralCount = avisData.filter((item) => item.sentiment === "neutre").length;

      setAvisCount(count);
      setPosetive(positiveCount);
      setNegative(negativeCount);
      setNeutre(neutralCount);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Number of Comment</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="number">
          {avisCount}
        </div>
        <p className="desc">
          Sentiments
        </p>
        <div className="summary">
            <div className="item">
            <KeyboardArrowDownIcon fontSize="small"/>
                <div className="itemTitle">positive</div>
                <div className="featuredChart">
                  <CircularProgressbar className="pose" value={(posetive*100)/avisCount} text={`${((posetive*100)/avisCount).toFixed(2)}%`} strokeWidth={5} />
                </div>
            </div>
            <div className="item">
            <KeyboardArrowDownIcon fontSize="small"/>
                 <div className="itemTitle">negative</div>
                 <div className="featuredChart">
                   <CircularProgressbar value={(negative*100)/avisCount} text={`${((negative*100)/avisCount).toFixed(2)}%`} strokeWidth={5} />
                 </div>
            </div>
            <div className="item">
            <KeyboardArrowDownIcon fontSize="small"/>
                 <div className="itemTitle">neutre</div>
                 <div className="featuredChart">
                  <CircularProgressbar value={(neutre*100)/avisCount} text={`${((neutre*100)/avisCount).toFixed(2)}%`} strokeWidth={5} />
                 </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Featured;
