import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Layout from "./Layout";
import DBox from "./ProjectDetails/DBox";
import UrbanAI from "./ProjectDetails/UrbanAI";
import FamilyFairShare from "./ProjectDetails/FamilyShare";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects/DBox" element={<DBox />} />
          <Route path="/projects/UrbanAI" element={<UrbanAI />} />
          <Route
            path="/projects/FamilyFairShare"
            element={<FamilyFairShare />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
