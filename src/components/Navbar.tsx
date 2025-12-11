import { useDispatch } from "react-redux";
import { Menu, X, ChevronDown } from "lucide-react";
import { toggleMenu, setActiveLink } from "@/store/slices/navSlice";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  isOpen: boolean;
  activeLink: string;
}

export function Navbar({ isOpen, activeLink }: NavbarProps) {
  const dispatch = useDispatch();
  const [companyOpen, setCompanyOpen] = useState(false); // Desktop dropdown
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false); // Mobile dropdown

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-14 items-center px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/growcode.png"
            alt="Growcode Solution"
            className="h-8 w-auto object-contain md:h-10"
            loading="lazy"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="relative hidden flex-1 items-center justify-center space-x-6 text-sm font-medium md:flex">
          {/* Home */}
          <Link
            to="/"
            className={`hover:text-gray-700 ${
              activeLink === "Home" ? "text-gray-900" : "text-gray-600"
            }`}
            onClick={() => {
              dispatch(setActiveLink("Home"));
              setCompanyOpen(false);
            }}
          >
            Home
          </Link>

          {/* COMPANY DROPDOWN (desktop) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCompanyOpen((prev) => !prev)}
              className={`flex items-center gap-1 hover:text-gray-700 ${
                ["About", "Blog", "Privacy", "Terms", "Careers"].includes(activeLink)
                  ? "text-gray-900"
                  : "text-gray-600"
              }`}
            >
              Company
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {companyOpen && (
              <div className="absolute left-0 z-50 mt-2 w-56 rounded-md border bg-white shadow-md">
                <Link
                  to="/about"
                  onClick={() => {
                    dispatch(setActiveLink("About"));
                    setCompanyOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  About Us
                </Link>

                <Link
                  to="/blog"
                  onClick={() => {
                    dispatch(setActiveLink("Blog"));
                    setCompanyOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Blog
                </Link>

                <Link
                  to="/life-and-culture"
                  onClick={() => {
                    dispatch(setActiveLink("About"));
                    setCompanyOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Life &amp; Culture
                </Link>

                <Link
                  to="/careers"
                  onClick={() => {
                    dispatch(setActiveLink("Careers"));
                    setCompanyOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Careers
                </Link>

                <Link
                  to="/privacy-policy"
                  onClick={() => {
                    dispatch(setActiveLink("Privacy"));
                    setCompanyOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms-and-conditions"
                  onClick={() => {
                    dispatch(setActiveLink("Terms"));
                    setCompanyOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            )}
          </div>

          {/* Services */}
          <Link
            to="/services"
            className={`hover:text-gray-700 ${
              activeLink === "Services" ? "text-gray-900" : "text-gray-600"
            }`}
            onClick={() => {
              dispatch(setActiveLink("Services"));
              setCompanyOpen(false);
            }}
          >
            Services
          </Link>

          {/* Portfolio */}
          <Link
            to="/portfolio"
            className={`hover:text-gray-700 ${
              activeLink === "Portfolio" ? "text-gray-900" : "text-gray-600"
            }`}
            onClick={() => {
              dispatch(setActiveLink("Portfolio"));
              setCompanyOpen(false);
            }}
          >
            Portfolio
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className={`hover:text-gray-700 ${
              activeLink === "Contact" ? "text-gray-900" : "text-gray-600"
            }`}
            onClick={() => {
              dispatch(setActiveLink("Contact"));
              setCompanyOpen(false);
            }}
          >
            Contact
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <Link to="/contact" className="hidden md:inline-flex">
            <Button size="sm">Get In Touch</Button>
          </Link>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => dispatch(toggleMenu())}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <div className="space-y-1 pb-2 pt-2">
            {/* Home */}
            <Link
              to="/"
              onClick={() => {
                dispatch(setActiveLink("Home"));
                dispatch(toggleMenu());
              }}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
            >
              Home
            </Link>

            {/* COMPANY MOBILE DROPDOWN */}
            <div>
              <button
                onClick={() => setMobileCompanyOpen((prev) => !prev)}
                className="flex w-full justify-between px-3 py-2 text-sm hover:bg-gray-100"
              >
                Company
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileCompanyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileCompanyOpen && (
                <div className="ml-4 space-y-1">
                  <Link
                    to="/about"
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      dispatch(setActiveLink("About"));
                      dispatch(toggleMenu());
                    }}
                  >
                    About Us
                  </Link>

                  <Link
                    to="/blog"
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      dispatch(setActiveLink("Blog"));
                      dispatch(toggleMenu());
                    }}
                  >
                    Blog
                  </Link>

                  <Link
                    to="/life-and-culture"
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      dispatch(setActiveLink("About"));
                      dispatch(toggleMenu());
                    }}
                  >
                    Life &amp; Culture
                  </Link>

                  <Link
                    to="/careers"
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      dispatch(setActiveLink("Careers"));
                      dispatch(toggleMenu());
                    }}
                  >
                    Careers
                  </Link>

                  <Link
                    to="/privacy-policy"
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      dispatch(setActiveLink("Privacy"));
                      dispatch(toggleMenu());
                    }}
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    to="/terms-and-conditions"
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      dispatch(setActiveLink("Terms"));
                      dispatch(toggleMenu());
                    }}
                  >
                    Terms &amp; Conditions
                  </Link>
                </div>
              )}
            </div>

            {/* Services */}
            <Link
              to="/services"
              onClick={() => {
                dispatch(setActiveLink("Services"));
                dispatch(toggleMenu());
              }}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
            >
              Services
            </Link>

            {/* Portfolio */}
            <Link
              to="/portfolio"
              onClick={() => {
                dispatch(setActiveLink("Portfolio"));
                dispatch(toggleMenu());
              }}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
            >
              Portfolio
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={() => {
                dispatch(setActiveLink("Contact"));
                dispatch(toggleMenu());
              }}
              className="block px-3 py-2 text-sm hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
  