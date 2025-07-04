import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import "./ScholarshipCard.css";

function ScholarshipCard({
  name,
  criteria,
  benefits,
  type,
  moreInfo,
  website,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="scholarship-card">
      <div className="scholarship-card-header">
        <h3 className="scholarship-title">{name}</h3>
        <span className="scholarship-type">{type}</span>
      </div>

      <button
        className="scholarship-toggle-btn"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      <Collapse in={showDetails}>
        <div className="scholarship-details">
          <div className="scholarship-section">
            <strong>Criteria:</strong>
            <ul>
              {(Array.isArray(criteria) ? criteria : [criteria]).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="scholarship-section">
            <strong>Benefits:</strong>
            <ul>
              {benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          {moreInfo && (
            <div className="scholarship-section">
              <strong>More Info:</strong> {moreInfo}
            </div>
          )}

          {website && (
            <div className="scholarship-section">
              <button className="btn btn-primary">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scholarship-link"
                  textDecoration="none"
                >
                  Visit Website
                </a>
              </button>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

export default ScholarshipCard;
