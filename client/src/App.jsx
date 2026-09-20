import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Observations from "./pages/Observations";
import ObservationDetails from "./pages/ObservationDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/observations"
          element={<Observations />}
        />

        <Route
          path="/observations/:id"
          element={<ObservationDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;