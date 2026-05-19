import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import CompoundInterest from "@/pages/tools/CompoundInterest";
import Calculator from "@/pages/tools/Calculator";
import Loan from "@/pages/tools/Loan";
import Mortgage from "@/pages/tools/Mortgage";
import WordChain from "@/pages/tools/WordChain";
import WordGenerator from "@/pages/tools/WordGenerator";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/calculator" element={<Calculator />} />
        <Route path="/tools/mortgage" element={<Mortgage />} />
        <Route path="/tools/loan" element={<Loan />} />
        <Route path="/tools/compound-interest" element={<CompoundInterest />} />
        <Route path="/tools/word-chain" element={<WordChain />} />
        <Route path="/tools/word-generator" element={<WordGenerator />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
