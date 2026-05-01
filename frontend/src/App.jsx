import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  return (
    <div className="bg-red-500">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
