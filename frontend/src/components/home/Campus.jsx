const images = [
  "/campus/campus1.jpeg",
  "/campus/campus2.webp",
  "/campus/campus3.jpeg",
  "/campus/campus4.jpeg",
  "/campus/campus5.jpeg",
  "/campus/campus6.jpg",
  "/campus/campus7.jpg",
  "/campus/campus8.jpg"
];

function Campus() {
  return (
    <div className="container my-5">
      <div className="row text-center mb-4">
        <h1 className="text-success fs-1 fw-bolder">Inside DTU</h1>
        <p className="text-muted" style={{ fontSize: "1.15rem" }}>
          Beautiful Campus, Beautiful Memories
        </p>
      </div>
      <div className="row g-3 justify-content-center">
        {images.map((image, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div className="campus-img-wrapper">
              <img
                src={image}
                alt={`Campus ${index + 1}`}
                className="img-fluid campus-img"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campus;