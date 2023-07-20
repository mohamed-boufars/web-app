/*import React, { useEffect } from "react";
import { useState } from "react";
import Articles from "../components/articles";

function Cmt(){
    const [articles, setArticles]=useState([])
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/get',{'method':'GET',headers:{'content-Type':'application/json'}})
         .then(resp=>resp.json())
         .then(resp=>setArticles(resp))
    },[])

    return(
        <div className="App">
            <Articles articles={articles}/>
        </div>
    )
}
export default Cmt();*/