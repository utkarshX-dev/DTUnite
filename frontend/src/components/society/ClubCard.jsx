import "./ClubCard.css";

function ClubCard({ name, council, description, advisor, instagram, image }) {
    return (
        <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="club-card-modern flex-fill">
                {image && (
                    <div className="club-image-modern mb-3">
                        <img src={image} alt={`${name} logo`} />
                    </div>
                )}
                <div className="club-card-body">
                    <h2 className="club-title">{name}</h2>
                    <p className="club-desc">{description}</p>
                    <p className="club-council"><strong>Council:</strong> {council}</p>
                    {advisor && <p className="club-advisor"><strong>Advisor:</strong> {advisor}</p>}
                    <div className="club-socials">
                        {instagram && (
                            <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="club-insta-link"
                            >
                                <img
                                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                                    alt="Instagram"
                                    style={{ width: 22, height: 22, marginRight: 6, verticalAlign: "middle" }}
                                />
                                Instagram
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubCard;