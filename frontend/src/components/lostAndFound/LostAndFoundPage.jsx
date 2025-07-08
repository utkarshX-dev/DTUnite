import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LostAndFoundCard from "./LostAndFoundCard";
import { UserContext } from "../contexts/userContext";

const apiBase = import.meta.env.VITE_API_BASE;

function LostAndFound() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [lostAndFoundItems, setLostAndFoundItems] = useState([]);

  const fetchLostAndFoundItems = async () => {
    try {
      const response = await axios.get(`${apiBase}/api/lost-and-found`);
      setLostAndFoundItems(response.data);
    } catch (error) {
      console.error("Error fetching lost and found items:", error);
    }
  };

  useEffect(() => {
    fetchLostAndFoundItems();
  }, []);

  const handleDelete = async (id) => {
    if (!user) return;
    try {
      await axios.delete(`${apiBase}/api/lost-and-found/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      setLostAndFoundItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="rounded p-4 mb-4">
        {user && (
          <h1 className="h1 mb-2 text-primary fw-bolder">
            Hi, {user.username}
          </h1>
        )}
        <p className="mb-3">
          {" "}
          View all reported lost and found items premises DTU campus.
        </p>

        {user ? (
          <button
            className="btn btn-danger mb-2"
            onClick={() => navigate("/lost-and-found/new")}
          >
            Found a lost item? Report it here!
          </button>
        ) : (
          <p>
            <em>
              Please{" "}
              <a
                onClick={() => navigate("/auth")}
                style={{
                  cursor: "pointer",
                  color: "#1976d2",
                  textDecoration: "underline",
                }}
              >
                login
              </a>{" "}
              to report a lost item.
            </em>
          </p>
        )}
      </div>
      <h4 className="h4 mb-4 text-center text-danger fw-bolder">Don't forget to delete items when found</h4>
      <div className="row g-4">
        {lostAndFoundItems.length > 0 ? (
          lostAndFoundItems.map((item) => (
            <div className="col-12 col-md-6" key={item._id}>
              <LostAndFoundCard
                item={item}
                user={user}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">
              No lost and found items available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LostAndFound;
