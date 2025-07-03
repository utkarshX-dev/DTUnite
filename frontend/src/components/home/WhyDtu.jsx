import React, { useEffect, useState } from "react";

export default function WhyDtu() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 1000;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 1);
    const interval = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container mt-5 p-3 mb-5">
        <div className="row flex-wrap align-items-center">
          <div className="p-4 mt-5 col-lg-6 col-12 d-flex flex-column justify-content-center align-items-center mb-4 mb-lg-0" style={{ minHeight: "100%" }}>
            <h1 className="fs-1 fw-bold text-primary">Why Dtu?</h1>
            <model-viewer
              class="island"
              src="./bird.glb"
              autoplay
              disable-zoom
              camera-controls
              shadow-intensity="1"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "50vh",
              }}
            ></model-viewer>
          </div>
          <div className="col-lg-6 col-12 fs-5 d-flex flex-column justify-content-center" style={{ minHeight: "100%" }}>
            <b>Legacy & Reputation</b> One of India’s oldest and most
            prestigious technical universities, known for academic excellence
            and innovation.
            <br />
            <br />
            <b>Outstanding Placements</b> Consistently strong placement records
            with top national and international recruiters.
            <br />
            <br />
            <b>Interdisciplinary Learning</b> A unique blend of engineering,
            design, management, and sciences under one roof.
            <br />
            <br />
            <b>Campus Life</b> A dynamic, inclusive community with active
            student clubs, research, and entrepreneurial spirit.
          </div>
        </div>
        <div
          className="row mt-5 p-4 p-md-5"
          style={{ backgroundColor: "#EFF6FF", borderRadius: "1rem" }}
        >
          <div className="col-md-4 col-12 text-center text-black mb-4 mb-md-0">
            <h3 className="fw-bold mb-2">1.8 Cr</h3>
            <p style={{ fontSize: "1.2rem" }} className="text-muted">
              Highest Package <br /> (International)
            </p>
          </div>
          <div className="col-md-4 col-12 text-center text-black mb-4 mb-md-0">
            <h3 className="fw-bold mb-2">85 LPA</h3>
            <p style={{ fontSize: "1.2rem" }} className="text-muted">
              Highest Package
              <br />
              (Domestic)
            </p>
          </div>
          <div className="col-md-4 col-12 text-center text-black">
            <h3 className="fw-bold mb-2">{count}+</h3>
            <p style={{ fontSize: "1.2rem" }} className="text-muted">
              Number of
              <br />
              Companies Visited
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 991.98px) {
          .fs-5 {
            font-size: 1.1rem !important;
          }
        }
        @media (max-width: 767.98px) {
          .container {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          .p-5 {
            padding: 2rem !important;
          }
          .p-4 {
            padding: 1.2rem !important;
          }
          .fs-1 {
            font-size: 2rem !important;
          }
        }
        @media (max-width: 575.98px) {
          .fs-5 {
            font-size: 1rem !important;
          }
          .fs-1 {
            font-size: 1.5rem !important;
          }
          .p-5, .p-4 {
            padding: 0.7rem !important;
          }
        }
      `}</style>
    </>
  );
}