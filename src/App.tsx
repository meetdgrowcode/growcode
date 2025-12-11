import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Contact } from "@/pages/Contact";
import { LifeAndCulture } from "./pages/LifeAndCulture";
import EmployeeSignIn from "@/pages/EmployeeSignIn";
import EmployeeLogin from "@/pages/EmployeeLogin";
import AdminSignIn from "@/pages/AdminSignIn";
import ServiceDetails from "@/pages/ServiceDetails";
import Portfolio from "./pages/Portfolio";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Careers from "./pages/Careers";
import ApplyForm from "./pages/ApplyForm";
function App() {
  const { isOpen, activeLink } = useSelector((state: RootState) => state.nav);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isOpen={isOpen} activeLink={activeLink} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/employe" element={<EmployeeSignIn />} />
            <Route path="/employe/login" element={<EmployeeLogin />} />
            <Route path="/admin" element={<AdminSignIn />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
            <Route path="/life-and-culture" element={<LifeAndCulture />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            
            <Route path="/careers" element={<Careers />} />

            <Route path="/apply/:jobId" element={<ApplyForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
