import societyData from "./societyData";
import ClubCard from "./ClubCard";

function ClubAndSociety() {
    return (
        <div className="container py-4">
            <h1 className="text-center text-primary fw-bold mb-2" style={{ letterSpacing: "0.03em", color: "#232526" }}>
                DTU Clubs & Societies
            </h1>
            <p className="text-center text-muted mb-4" style={{ fontSize: "1.13rem" }}>
                Discover and connect with the vibrant clubs and societies of DTU. Explore your interests, join communities, and be a part of something amazing!
            </p>
            <div className="row">
                {societyData.map((club, index) => (
                    <ClubCard key={index} {...club} />
                ))}
            </div>
        </div>
    );
}

export default ClubAndSociety;