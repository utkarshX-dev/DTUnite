import "../../styles/home.css";
import Card from "./Card";

function QuickLinks() {
  return (
    <div className="container-fluid">
      <h2
        className="text-center fw-bold"
        style={{
          color: "#ff4500",
          fontSize: "2.2rem",
          letterSpacing: "1px",
          marginTop: "2rem",
          marginBottom: "0.5rem",
        }}
      >
        Quick Links
      </h2>
      <div className="row justify-content-center my-4">
        <div className="col-6 col-md-3 mb-3">
          <Card
            icon="🎓"
            title="Scholarships"
            description="Find and apply for scholarships."
            to="/scholarships"
          />
        </div>
        <div className="col-6 col-md-3 mb-3">
          <Card
            icon="📊"
            title="Results"
            description="Check your latest results."
            to="/results"
          />
        </div>
        <div className="col-6 col-md-3 mb-3">
          <Card
            icon="🤝"
            title="Clubs & Societies"
            description="Explore campus clubs and groups."
            to="/clubs-societies"
          />
        </div>
        <div className="col-6 col-md-3 mb-3">
          <Card
            icon="💬"
            title="Placement"
            description="Explore latest placement statistics ."
            to="/placement-stats"
          />
        </div>
      </div>
    </div>
  );
}

export default QuickLinks;
