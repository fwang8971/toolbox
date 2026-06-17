import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const Disclaimer = lazy(() => import("@/pages/Disclaimer"));
const Guides = lazy(() => import("@/pages/Guides"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const CompoundInterestBasics = lazy(
  () => import("@/pages/guides/CompoundInterestBasics"),
);
const HomeAffordabilityBasics = lazy(
  () => import("@/pages/guides/HomeAffordabilityBasics"),
);
const LoanComparisonGuide = lazy(
  () => import("@/pages/guides/LoanComparisonGuide"),
);
const MortgagePaymentGuide = lazy(
  () => import("@/pages/guides/MortgagePaymentGuide"),
);
const Tools = lazy(() => import("@/pages/Tools"));
const CompoundInterest = lazy(() => import("@/pages/tools/CompoundInterest"));
const Calculator = lazy(() => import("@/pages/tools/Calculator"));
const Loan = lazy(() => import("@/pages/tools/Loan"));
const Mortgage = lazy(() => import("@/pages/tools/Mortgage"));
const WordChain = lazy(() => import("@/pages/tools/WordChain"));
const WordGenerator = lazy(() => import("@/pages/tools/WordGenerator"));

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Suspense
        fallback={
          <div className="container-page py-16 text-sm text-zinc-500 dark:text-zinc-400">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/calculator" element={<Calculator />} />
          <Route path="/tools/mortgage" element={<Mortgage />} />
          <Route path="/tools/loan" element={<Loan />} />
          <Route path="/tools/compound-interest" element={<CompoundInterest />} />
          <Route path="/tools/word-chain" element={<WordChain />} />
          <Route path="/tools/word-generator" element={<WordGenerator />} />
          <Route path="/guides" element={<Guides />} />
          <Route
            path="/guides/mortgage-payment-guide"
            element={<MortgagePaymentGuide />}
          />
          <Route
            path="/guides/compound-interest-basics"
            element={<CompoundInterestBasics />}
          />
          <Route
            path="/guides/home-affordability-basics"
            element={<HomeAffordabilityBasics />}
          />
          <Route
            path="/guides/loan-comparison-guide"
            element={<LoanComparisonGuide />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
