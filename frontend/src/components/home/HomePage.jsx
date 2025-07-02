import "../../styles/home.css";
import { Link } from "react-router-dom";
import QuickLinks from "./QuickLinks";
import Campus from "./Campus";
import Alumni from "./Alumni";
import Hero from "./Hero";

function HomePage() {
  return (
    <div className="container-fluid">
      <Hero />
      <Campus />
      <QuickLinks />
      <Alumni />
    </div>
  );
}

export default HomePage;