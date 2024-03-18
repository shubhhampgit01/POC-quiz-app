import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Result from "./pages/result";
import Solutions from "./pages/solutions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="/solutions" element={<Solutions />} />
    </Routes>
  );
}

export default App;
