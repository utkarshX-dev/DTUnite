import "../../styles/home.css";
import QuickLinks from "./QuickLinks";
import Campus from "./Campus";
import Alumni from "./Alumni";
import Hero from "./Hero";
import WhyDtu from "./WhyDtu";
import Recruiters from "./Recruiters";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="container-fluid">
      <div data-aos="fade-up">
        <Hero />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Campus />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <QuickLinks />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <Alumni />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <WhyDtu />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <Recruiters />
      </div>
      
    </div>
  );
}

export default HomePage;