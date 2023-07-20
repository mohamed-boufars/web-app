import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <h2>Privacy Policy</h2>
          <p>
            At OurPharmacy, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our website.
          </p>
          <p>Your personal information will not be sold, exchanged, transferred,
            or given to any other company for any reason without your consent,
            except as necessary to fulfill a request you have made or comply
            with applicable laws and regulations.</p>
          <p>By using our website, you consent to the terms of this Privacy
            Policy. If you have any questions or concerns about our Privacy
            Policy, please contact us.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
