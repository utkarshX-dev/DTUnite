import FooterForm from "./FooterForm";

export default function Footer() {
  return (
    <>
      <div
        className="text-white px-4 px-md-5 py-5"
        style={{
          background: `url("/footer_backdrop.png") center center/cover no-repeat`,
        }}
        id="footer"
      >
        <div className="container-xl">
          <div className="row gy-5 align-items-start">
            {/* Left Side Info */}
            <div className="col-12 col-lg-6">
              <div className="row">
                {/* University Info */}
                <div className="col-12 col-sm-6 mb-4 mb-sm-0">
                  <h3 className="fw-semibold">
                    Delhi Technological <br />
                    University
                  </h3>
                  <p className="mb-0" style={{ fontWeight: 400, fontSize: "0.95rem" }}>
                    Bawana Rd,
                    <br /> Delhi Technological University,
                    <br /> Shahbad Daulatpur Village,
                    <br /> Rohini, Delhi - 110042
                  </p>
                </div>

                {/* DTUnite Info */}
                <div
                  className="col-12 col-sm-6 mt-4 mt-sm-0"
                  style={{
                    borderLeft: "1px solid #fff",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <div className="d-flex flex-column align-items-start">
                    <h3 className="fs-2 fw-bold">DTUnite</h3>
                    <p className="mt-3 mb-2" style={{ fontWeight: 400, fontSize: "0.95rem" }}>
                      Phone:{" "}
                      <a
                        href="tel:+91-11-27871018"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                      >
                        +91-XX-XXXX-XXXX
                      </a>
                    </p>
                    <p className="mb-0" style={{ fontWeight: 400, fontSize: "0.95rem" }}>
                      Email:{" "}
                      <a
                        href="mailto:dtuunite@gmail.com"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                      >
                        dtuunite@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="col-12 col-lg-6">
              <FooterForm />
            </div>
          </div>

          
          <div className="mt-5">
            <hr className="border-light" />
            <div className="fs-6 text-center mt-3" style={{ fontSize: "0.9rem", color: "#ddd" }}>
              © {new Date().getFullYear()}, All Rights Reserved. Made with{" "}
              <span style={{ color: "red" }}>❤️</span> by <strong>DTUnite Team</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
