import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
