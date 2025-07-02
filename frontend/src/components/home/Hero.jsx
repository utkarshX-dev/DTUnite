import "../../styles/home.css";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="homepage-hero mb-5">
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-12 col-md-6 text-center text-md-start py-5">
            <h1 className="display-4 fw-bold mb-3">
              Welcome to <br />
              <span className="highlight">DTUnite</span>
            </h1>
            <p className="lead text-muted mb-4">
              One Stop Solution for your DTU Doubts
            </p>
            <div className="d-flex d-md-block justify-content-center justify-content-md-start">
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <button className="btn-grad">Explore</button>
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center py-4">
            <model-viewer
              class="island"
              src="./island.glb"
              autoplay
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "60vh",
                minHeight: "300px",
                borderRadius: "16px",
              }}
            ></model-viewer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
