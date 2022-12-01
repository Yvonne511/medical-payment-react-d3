import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./elements/Nav";
import Home from "./components/Home";
import Data from "./components/Data/Data";
import './index.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="data" element={<Data />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
