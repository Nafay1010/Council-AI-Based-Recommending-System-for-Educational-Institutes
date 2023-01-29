import { useEffect, useRef } from "react";
import img1 from "./frontend_images/icon.png";
import img2 from "./frontend_images/icon-3.png";
import img3 from "./frontend_images/icon-4.png";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "./Templates/Footer";

const LandingPage = () => {
  const one = useRef(null);
  const two = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="LandingPage">
      <div className="logo">
        <h1>Welcome to Council</h1>
      </div>
      <div className="white-background">
        <div className="written-content" data-aos="fade-right">
          <h1>Make your life easier with counciling</h1>
          <h4>
            Get recommendation on which university to get enrolled in based on
            your requirement.
          </h4>
          <button onClick={() => scrollToSection(one)}>Learn more!</button>
        </div>
        <div className="icon" data-aos="fade-left">
          <img src={img1} alt="img1" />
        </div>
      </div>
      <div className="grey-background">
        <div className="icon2" data-aos="fade-right">
          <img src={img2} alt="img2" />
        </div>
        <div className="written-content">
          <h1 ref={one} data-aos="fade-right">
            Generate recommendation with Ensemble Models
          </h1>
          <button onClick={() => scrollToSection(two)} data-aos="fade-up">
            Learn more!
          </button>
        </div>
      </div>
      <div className="blue-background">
        <div className="written-content">
          <h1 ref={two} data-aos="fade-right">
            Provide us with your criteria and get the best university that fully
            supports your needs
          </h1>
          <Link to="/aboutUs">
            <button>About Us!</button>
          </Link>
        </div>
        <div className="icon2" data-aos="fade-left">
          <img src={img3} alt="img3" />
        </div>
      </div>
      <div className="black-background">
        <div className="register">
          <h1 data-aos="fade-down">Register Yourself!</h1>
          <Link to={"/signup"} data-aos="fade-up">
            <button>Register!</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
