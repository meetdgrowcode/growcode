import { useParams, Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle, Upload } from "lucide-react";
import { useState } from "react";

export default function ApplyForm() {
  const { jobId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("No file chosen");

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">

      {/* Back Button */}
      <div className="mb-6 flex items-center gap-2">
        <Link
          to="/careers"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Careers
        </Link>
      </div>

      {/* FORM CONTAINER */}
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow-md animate-fade-in-up">

        {!submitted ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              Apply for:{" "}
              <span className="text-indigo-600">
                {decodeURIComponent(jobId || "")}
              </span>
            </h1>

            <p className="mt-2 text-gray-500">
              Please fill out your details and upload your CV/Resume.
            </p>

            <form onSubmit={submitForm} className="mt-8 space-y-5">

              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input required placeholder="Enter your full name" />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <Input type="email" required placeholder="your@email.com" />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <Input required placeholder="9876543210" />
              </div>

              {/* Portfolio/GitHub */}
              <div>
                <label className="text-sm font-medium text-gray-700">Portfolio / GitHub (optional)</label>
                <Input placeholder="https://your-portfolio.com" />
              </div>

              {/* UPLOAD RESUME */}
              <div>
                <label className="text-sm font-medium text-gray-700">Upload Resume / CV *</label>

                <div className="mt-2 flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-3">
                  <label
                    htmlFor="resume"
                    className="flex cursor-pointer items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
                  >
                    <Upload className="h-4 w-4" />
                    Choose File
                  </label>

                  <input
                    id="resume"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeUpload}
                  />

                  <span className="text-sm text-gray-600 truncate">{resumeName}</span>
                </div>

                <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-full bg-indigo-600 py-2 text-white hover:bg-indigo-700 transition"
              >
                Submit Application
              </Button>
            </form>
          </>
        ) : (
          /* SUCCESS PAGE */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCircle className="mb-4 h-12 w-12 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Application Submitted!</h2>

            <p className="mt-2 max-w-sm text-gray-600">
              Your application for{" "}
              <span className="font-medium text-indigo-600">
                {decodeURIComponent(jobId || "")}
              </span>{" "}
              has been received.
            </p>

            <Link to="/careers" className="mt-6">
              <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                Back to Careers
              </Button>
            </Link>
          </div>
        )}

      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up .5s ease forwards;
        }
      `}</style>
    </div>
  );
}
