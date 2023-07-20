import React from "react";
import "./stule.css"

const Banner = () => {
    var counter=1;
        setInterval(function(){
            document.getElementById("radio" +counter).checked=true;
            counter++;
            if(counter>3){
                counter=1;
            }
        },5000);
  return (
    <div className="slider">
        <div className="slides">
            <input type="radio" name="radio-btn" id="radio1"/>
            <input type="radio" name="radio-btn" id="radio2"/>
            <input type="radio" name="radio-btn" id="radio3"/>
            <input type="radio" name="radio-btn" id="radio4"/>

            <div className="slide first">
                <img src="s1.jpg" alt=""/>
            </div>
            <div className="slide ">
                <img src="s2.jpg" alt=""/>
            </div>
            <div className="slide ">
                <img src="s3.jpg" alt=""/>
            </div>
            <div className="navigation-auto">
                <div className="auto-btn1"></div>
                <div className="auto-btn2"></div>
                <div className="auto-btn3"></div>
            </div>
        </div>
        <div className="navigation-manual">
            <label for="radio1" className="manual-btn"></label>
            <label for="radio2" className="manual-btn"></label>
            <label for="radio3" className="manual-btn"></label>
        </div>
    </div>

  )
}
export default Banner;