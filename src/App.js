import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./elements/Nav";
import Home from "./components/Home";
import Specialty from "./components/Data/Specialty";
import LevelOfCare from "./components/Data/LevelOfCare";
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter basename ={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="specialty" element={<Specialty />} />
          <Route path="levelofcare" element={<LevelOfCare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
