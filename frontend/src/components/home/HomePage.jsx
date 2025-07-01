import axios from "axios";
import PostCard from "../PostCard";
import { useEffect, useState } from "react";
function HomePage() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/posts");
                setData(response.data);
                console.log("Data fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            
        </div>
     );
}

export default HomePage;