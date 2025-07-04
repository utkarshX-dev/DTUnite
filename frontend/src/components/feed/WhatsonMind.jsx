import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function WhatsOnMind({ userAvatar }) {
    const navigate = useNavigate();
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 1.5px 8px rgba(60,72,88,0.10)",
                padding: "1.25rem 1.5rem",
                margin: "32px 0 24px 0",
                width: "100%",
                border: "1px solid #f0f1f3",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
            }}
        >
            <Avatar
                src={userAvatar}
                sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "#f5f6fa",
                    color: "#444",
                    fontWeight: 600,
                    fontSize: 22,
                    border: "1px solid #e0e0e0"
                }}
            >
            </Avatar>
            <button
                onClick={() => navigate('/create')}
                style={{
                    flex: 1,
                    background: "#f0f2f5",
                    color: "#444",
                    border: "none",
                    borderRadius: "22px",
                    padding: "12px 20px",
                    fontWeight: 500,
                    fontSize: "1.08rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.18s",
                    outline: "none"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#e4e6eb")}
                onMouseOut={e => (e.currentTarget.style.background = "#f0f2f5")}
            >
                What's on your mind?
            </button>
        </div>
    );
}
export default WhatsOnMind;