function Footer2() {
    return (
        <footer
            style={{
                background: "black",
                color: "#f1f1f1",
                padding: "1.5rem 0",
                borderTop: "1px solid #2d323a",
                marginTop: "auto",
                fontSize: "1.08rem",
                letterSpacing: "0.03em",
                boxShadow: "0 -2px 16px 0 rgba(30,34,40,0.12)",
            }}
        >
            <div className="container text-center">
                <span style={{ fontWeight: 500 }}>
                    &copy; {new Date().getFullYear()} <strong style={{ color: "#ff7043" }}>DTUnite</strong>
                    . All rights reserved.
                </span>
                <div style={{ fontSize: "0.93rem", color: "#bdbdbd", marginTop: 4 }}>
                    Made with <span style={{ color: "#ff5252", fontSize: "1.1em" }}>❤️</span> by the DTUnite Team
                </div>
            </div>
        </footer>
    );
}

export default Footer2;