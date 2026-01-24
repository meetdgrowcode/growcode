import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Suspense, lazy } from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalLoader } from "@/components/GlobalLoader";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })));
const Services = lazy(() => import("@/pages/Services").then(m => ({ default: m.Services })));
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
const LifeAndCulture = lazy(() => import("./pages/LifeAndCulture").then(m => ({ default: m.LifeAndCulture })));

// Default exports
const AdminSignIn = lazy(() => import("@/pages/AdminSignIn"));
const ServiceDetails = lazy(() => import("@/pages/ServiceDetails"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const PortfolioDetailPage = lazy(() => import("./pages/PortfolioDetailPage"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
const Careers = lazy(() => import("./pages/Careers"));
const ApplyForm = lazy(() => import("./pages/ApplyForm"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));

// Admin & Employee pages (keep direct or lazy? lazy is better for bundle size)
const AdminLayout = lazy(() => import("@/components/admin/AdminLayout"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminProjects = lazy(() => import("@/pages/admin/AdminProjects"));
const TeamTrackerPage = lazy(() => import("./pages/admin/TeamTrackerPage"));
const Payroll = lazy(() => import("@/pages/admin/Payroll"));
const EmployeeDetailPage = lazy(() => import("./pages/admin/EmployeeDetailPage"));

const EmployeeDashboard = lazy(() => import("@/pages/employee/EmployeeDashboard"));
const EmployeeTracker = lazy(() => import("./pages/employee/EmployeeTracker"));
const ProfileSettings = lazy(() => import("./pages/employee/ProfileSettings"));
const EmployeeLayout = lazy(() => import("./layouts/EmployeeLayout"));

// Protected Routes need to be lazy too if they are components, but they are likely imported directly in the file.
// Since we are lazy loading the *routes*, we just need to ensure the route wrappers are fine.
import AdminProtectedRoute from "@/routes/AdminProtectedRoute";
import EmployeeProtectedRoute from "@/routes/EmployeeProtectedRoute";

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
        <Suspense fallback={<GlobalLoader />}>
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
        </Suspense>
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
