import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import "./components/LandingPage/LandingPage.css"
import LandingPage from "./pages/LandingPage/LandingPage";
// const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <div className="App">
      <div>
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
