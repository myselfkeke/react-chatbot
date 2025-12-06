import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} /> //path="/" ------------ "index"
        <Route path="/checkout" element={<div>Sample cheking page</div>} />
      </Routes>
    </>
  );
}

export default App;
