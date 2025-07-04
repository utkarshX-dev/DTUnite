import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row align-items-center text-center text-lg-start shadow-lg rounded-4 p-4">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
          <h1 className="display-4 fw-bold text-danger">404</h1>
          <h2 className="h4 fw-semibold mb-3">Page Not Found</h2>
          <p className="text-muted mb-3">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-muted mb-4">
            It might have been moved or deleted. You can go back to the home page.
          </p>
          <Link to="/" className="btn btn-primary px-4 py-2">
            Go to Home
          </Link>
        </div>
        <div className="col-12 col-lg-6">
          <img
            src="/404.png"
            alt="Page Not Found"
            className="img-fluid rounded-3"
          />
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
