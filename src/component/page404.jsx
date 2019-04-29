import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const page404 = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page404;