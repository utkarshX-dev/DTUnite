import { Link } from "react-router-dom";

function Card({ icon, title, description, to }) {
  return (
    <Link to={to} className="text-decoration-none">
      <div
        className="card h-100 shadow quick-link-card text-center"
        style={{
          minHeight: 220,
          borderRadius: "1.5rem",
          transition: "transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s",
          padding: "2rem 1.5rem",
          cursor: "pointer",
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center p-0">
          <span style={{ fontSize: "3rem", marginBottom: "1rem" }}>{icon}</span>
          <h4 className="card-title mb-2 fw-bold" style={{ fontSize: "1.5rem" }}>{title}</h4>
          <p className="card-text text-muted" style={{ fontSize: "1.1rem" }}>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;