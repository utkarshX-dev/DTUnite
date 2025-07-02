function Footer() {
    return (
        <footer className="w-100 mt-auto" style={{ backgroundColor: "#23272f" }}>
            <div className="container-fluid text-white text-center py-3">
                <hr style={{ borderColor: "#3b4252", opacity: 0.3, margin: "0 0 12px 0" }} />
                <p className="mb-1" style={{ fontWeight: 500 }}>
                    © {new Date().getFullYear()} DTUnite. All rights reserved.
                </p>
                <p className="mb-0" style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>
                    Made with <span style={{ color: "#ff4500" }}>❤️</span> by the DTUnite Team
                </p>
            </div>
        </footer>
    );
}

export default Footer;