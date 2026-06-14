import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AnalyzerPage from "./pages/AnalyzerPage";

export default function App() {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<LandingPage />} />
<Route path="/analyzer" element={<AnalyzerPage />} /> </Routes> </BrowserRouter>
);
}
