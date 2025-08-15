import { Footer } from "./Footer";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="container-homepage">
      <section id="home" className="section">
        <h1>HELLO</h1>
        {/* content */}
      </section>
      <section id="about" className="section">
        <h1>About Me</h1>
        {/* content */}
      </section>
      <section id="resume" className="section">
        <h1>Resume</h1>
        {/* content */}
      </section>
      <section id="projects" className="section">
        <h1>Projects</h1>
        {/* content */}
      </section>
      <Footer />
    </div>
  );
}

export default Homepage;
