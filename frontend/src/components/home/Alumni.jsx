import "../../styles/home.css"
const alumniData = [
    {
    img: "/Alumni/vc.jpg",
    name: "Prof. Prateek Sharma",
    description: "Vice Chancellor of DTU, leading the university towards excellence."
  },
  {
    img: "/Alumni/Vinod Dham.jpg",
    name: "Vinod Dham",
    description: "Inventor of the Pentium chip, Venture Capitalist, and widely known as the 'Father of the Pentium Chip'."
  },
  {
    img: "/Alumni/Vijay Shekhar Sharma.jpg",
    name: "Vijay Shekhar Sharma",
    description: "Founder & CEO of Paytm, one of India's leading digital payment platforms."
  },
 
  {
    img: "/Alumni/Suhail Sameer.jpg",
    name: "Suhail Sameer",
    description: "CEO of BharatPe, a prominent fintech company in India."
  },
  {
    img: "/Alumni/shiv dass agarwal.jpg",
    name: "Shiv Dass Agarwal",
    description: "Renowned for contributions in engineering and academia."
  },
  {
    img: "/Alumni/SanjayGupta.jpg",
    name: "Sanjay Gupta",
    description: "Country Head & VP at Google India, a leader in the tech industry."
  },
  {
    img: "/Alumni/Rajesh K. Soin.jpg",
    name: "Rajesh K. Soin",
    description: "Founder, Chairman & CEO of Soin International, a global technology group."
  },
  {
    img: "/Alumni/Promod Haque.jpg",
    name: "Promod Haque",
    description: "Managing Partner at Norwest Venture Partners, a top global venture capitalist."
  },
  {
    img: "/Alumni/Praveen Sinha.jpg",
    name: "Praveen Sinha",
    description: "Co-founder of Jabong, entrepreneur and investor."
  },
  {
    img: "/Alumni/pawan.jpg",
    name: "Pawan Munjal",
    description: "Chairman & CEO of Hero MotoCorp, a global leader in two-wheelers."
  },
  {
    img: "/Alumni/Navtez Bal.jpg",
    name: "Navtez Bal",
    description: "Partner at McKinsey & Company, expert in digital and analytics."
  },
  {
    img: "/Alumni/Mahesh Joshi.jpg",
    name: "Mahesh Joshi",
    description: "President at Larsen & Toubro, a leader in engineering and construction."
  },
  {
    img: "/Alumni/Karnal Singh.jpg",
    name: "Karnal Singh",
    description: "Former Director of Enforcement Directorate, Government of India."
  },
  {
    img: "/Alumni/Goswami Brothers Alumni Gold Medal.jpg",
    name: "Goswami Brothers",
    description: "Alumni Gold Medalists, recognized for academic and professional excellence."
  },
  {
    img: "/Alumni/Ganesh Krishna.jpg",
    name: "Ganesh Krishna",
    description: "Distinguished alumnus known for contributions in engineering."
  },
  {
    img: "/Alumni/Dr. Durga Das Agrawal.jpg",
    name: "Dr. Durga Das Agrawal",
    description: "Founder & CEO of Piping Technology & Products, Inc., philanthropist and entrepreneur."
  },
  {
    img: "/Alumni/Dinesh Bhatia.jpg",
    name: "Dinesh Bhatia",
    description: "Indian Ambassador to Argentina, representing India globally."
  },
  {
    img: "/Alumni/Dharendra Yogi Goswami.jpg",
    name: "Dharendra Yogi Goswami",
    description: "Distinguished Professor and Director at Clean Energy Research Center, University of South Florida."
  }
];

function Alumni() {
  return (
    <div className="container alumni-container">
      <h1 className="text-center text-success fs-1 fw-bolder">
        Remarkable Alumnies of DTU
      </h1>
      <p className="text-center alumni-subtext">
        Connect with our esteemed alumni and explore their journeys.
      </p>

      <div className="row justify-content-center mt-5">
        {alumniData.map((alum, idx) => (
          <div
            key={idx}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
          >
            <div className="alumni-card">
              <img src={alum.img} alt={alum.name} className="alumni-img" />
              <div className="alumni-name">{alum.name}</div>
              <div className="alumni-desc">{alum.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alumni;