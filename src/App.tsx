import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hangman from "./components/hangman";
import WelcomeScreen from "./components/welcome";

function App() {
  return (
    <>
      
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/hangman" element={<Hangman />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
