import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Pharmacie"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" ,marginBottom:'20px'}}
            />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          <br />
            Your trusted destination for all your pharmaceutical needs.
            <br /><br />
            At Our Pharmacie, we believe in the importance of your health and well-being. Our team of experienced and knowledgeable pharmacists is committed to ensuring that you receive the best care and advice for your specific health concerns.
            <br /><br />
            We offer a wide range of prescription medications, over-the-counter drugs, and health products to address various medical conditions. Whether you need medications for chronic illnesses, acute ailments, or general health maintenance, we have you covered.
            <br /><br />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
