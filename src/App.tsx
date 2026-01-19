import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Contact } from "@/pages/Contact";
import { LifeAndCulture } from "./pages/LifeAndCulture";
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

import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboard";
import AdminProtectedRoute from "@/routes/AdminProtectedRoute";
import AdminUsersPage from "@/pages/admin/AdminUsers";
import AdminProjects from "@/pages/admin/AdminProjects";

import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";
import EmployeeProtectedRoute from "@/routes/EmployeeProtectedRoute";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeTracker from "./pages/employee/EmployeeTracker";
import ProfileSettings from "./pages/employee/ProfileSettings";
import TeamTrackerPage from "./pages/admin/TeamTrackerPage";
import EmployeeDetailPage from "./pages/admin/EmployeeDetailPage";  // ← admin folder માં રાખ
import Payroll from "@/pages/admin/Payroll";

function AppContent() {
  const location = useLocation();
  const { isOpen, activeLink } = useSelector((state: RootState) => state.nav);

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/employee");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar isOpen={isOpen} activeLink={activeLink} />}

      <main className="flex-1">
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ EMPLOYEE LOGIN */}
          <Route path="/employee/login" element={<EmployeeLogin />} />

          {/* ================= EMPLOYEE PROTECTED ================= */}
          <Route element={<EmployeeProtectedRoute />}>
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<EmployeeDashboard />} />
              <Route path="tracker" element={<EmployeeTracker />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          {/* ================= ADMIN AUTH ================= */}
          <Route path="/admin/signin" element={<AdminSignIn />} />

          {/* ================= ADMIN PROTECTED ================= */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="tracker" element={<TeamTrackerPage />} />
              <Route path="payroll" element={<Payroll />} />
              {/* 👈 અહીં add કર્યું Employee Detail Page */}
              <Route path="employee/:id" element={<EmployeeDetailPage />} />
            </Route>
          </Route>

          {/* ================= OTHER PUBLIC ================= */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/life-and-culture" element={<LifeAndCulture />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/apply/:jobId" element={<ApplyForm />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}