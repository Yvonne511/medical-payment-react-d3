import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./elements/Nav";
import Home from "./components/Home";
import Specialty from "./components/Data/Specialty";
import LevelOfCare from "./components/Data/LevelOfCare";
import Manufacturer from "./components/Data/Manufacturer";
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="specialty" element={<Specialty />} />
          <Route path="levelofcare" element={<LevelOfCare />} />
          <Route path="manufacturer" element={<Manufacturer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
