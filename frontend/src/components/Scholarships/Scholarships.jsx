import scholarshipData from "./ScholarshipData";
import ScholarshipCard from "./ScholarshipCard";

function ScholarshipsPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-3 text-primary">
        Scholarships
      </h1>
      <p className="text-center text-secondary mb-4 fs-5">
       Explore various scholarships and their benefits.
      </p>

      <div className="row g-4">
        {scholarshipData.map((scholarship, index) => (
          <div className="col-12" key={index}>
            <ScholarshipCard {...scholarship} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScholarshipsPage;
