import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import "./styles.css"; // Import the new stylesheet
// import "./components/Globe";

function App() {
  return (
    <div className="App">
      <Navbar />
      <News />
    </div>
  );
}

export default App;
