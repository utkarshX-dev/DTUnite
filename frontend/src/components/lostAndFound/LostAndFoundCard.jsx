import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import "./lfCard.css";

function LostAndFoundCard({ item, user, onDelete }) {
  const isOwner = user && user._id === item.postedBy?._id;
  const dateObj = new Date(item.createdAt);
  const dateStr = dateObj.toLocaleDateString();
  const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="laf-card">
      {item.image && (
        <img src={item.image} alt={item.title} className="laf-card-img" />
      )}
      <div className="laf-card-body">
        <h3 className="laf-title">{item.title}</h3>
        <p className="laf-desc">{item.description}</p>
        <div className="laf-info" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
          <span>
            <LocationOnIcon fontSize="small" /> <b>Location:</b> {item.location}
          </span>
          <span>
            <ContactPhoneIcon fontSize="small" /> <b>Contact:</b> {item.contact}
          </span>
          <span>
            <CalendarTodayIcon fontSize="small" /> <b>Date:</b> {dateStr}
          </span>
          <span>
            <CalendarTodayIcon fontSize="small" /> <b>Time:</b> {timeStr}
          </span>
          <span>
            <PersonIcon fontSize="small" /> <b>Posted by:</b> {item.postedBy?.username || "Anonymous"}
          </span>
        </div>

        {isOwner && (
          <button
            className="btn btn-danger m-2"
            onClick={() => onDelete(item._id)}
          >
            <DeleteIcon fontSize="small" /> Delete When Owner Found
          </button>
        )}
      </div>
    </div>
  );
}

export default LostAndFoundCard;