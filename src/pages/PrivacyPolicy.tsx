import { useRef } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ShieldCheck,
  CalendarDays,
  RefreshCcw,
  Info,
  Download,
} from "lucide-react";
import { jsPDF } from "jspdf";

function getReviewInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); 

  let lastReview: Date;
  let nextReview: Date;

  if (month < 6) {
    lastReview = new Date(year, 0, 1); // Jan 1
    nextReview = new Date(year, 6, 1); // Jul 1
  } else {
    lastReview = new Date(year, 6, 1); // Jul 1
    nextReview = new Date(year + 1, 0, 1); // Jan 1 next year
  }

  const formatMonthYear = (date: Date) =>
    date.toLocaleString("en-US", { month: "long", year: "numeric" });

  return {
    lastReviewLabel: formatMonthYear(lastReview),
    nextReviewLabel: formatMonthYear(nextReview),
  };
}

// Helper: load logo from public and convert to base64
async function loadLogoAsDataUrl(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("growcode/png");
      resolve(dataUrl);
    };

    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export default function PrivacyPolicy() {
  const { lastReviewLabel, nextReviewLabel } = getReviewInfo();
  const policyRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = async () => {
    if (!policyRef.current) return;

    const text = policyRef.current.innerText || "";
    if (!text.trim()) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // ---- Header: logo + title ----
    const logoDataUrl = await loadLogoAsDataUrl("/logo.png");

    if (logoDataUrl) {
      // x, y, width, height
      doc.addImage(logoDataUrl, "PNG", 15, 10, 25, 10);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("GrowCode Solution", logoDataUrl ? 45 : 15, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Privacy Policy", logoDataUrl ? 45 : 15, 24);

    doc.setDrawColor(180);
    doc.setLineWidth(0.4);
    doc.line(15, 30, pageWidth - 15, 30);

    // ---- Body: article text ----
    const marginLeft = 15;
    const marginTop = 38;
    const maxWidth = pageWidth - marginLeft * 2;
    const lineHeight = 7;

    const lines = doc.splitTextToSize(text, maxWidth);

    let cursorY = marginTop;

    lines.forEach((line) => {
      if (cursorY > 280) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });

    doc.save("Growcode-privacy-policy.pdf");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO / HEADER */}
      <section className="relative border-b bg-gradient-to-br from-sky-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3)_0,_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.3)_0,_transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-12 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Home
              </Link>

              <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 md:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5" />
                Privacy-first by design
              </span>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-600 px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-sky-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                Official Privacy Policy
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Privacy Policy
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                This Privacy Policy explains how we collect, use, store and
                protect personal data when you visit our website, contact us, or
                use our services. By using our website and services, you agree
                to the practices described in this Policy.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-600" />
                  <span className="font-medium text-slate-800">
                    Last reviewed:
                  </span>
                  <span className="text-slate-700">{lastReviewLabel}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 ring-1 ring-sky-200">
                  <RefreshCcw className="h-3.5 w-3.5 text-sky-600" />
                  <span className="font-medium text-slate-800">
                    Next scheduled review:
                  </span>
                  <span className="text-slate-700">{nextReviewLabel}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Automatically reviewed every 6 months
                </div>
              </div>
            </div>

            <div className="md:justify-self-end">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm sm:p-5">
                <div className="absolute -top-6 -right-10 h-24 w-24 rounded-full bg-sky-100 blur-2xl" />
                <div className="absolute -bottom-10 -left-4 h-20 w-28 rounded-full bg-emerald-100 blur-2xl" />

                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    Enterprise-grade governance
                  </div>
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    We handle personal data for clients across different
                    geographies and industries. Our internal processes are
                    aligned with modern data protection expectations and audit
                    readiness.
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Secure infrastructure & access controls
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                      Clear data lifecycle & retention
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                      Transparent communication channels
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT – ONLY THIS TEXT GOES INTO PDF */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* Policy text (PDF source) */}
          <article
            ref={policyRef}
            className="overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-8"
          >
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
              <h2>1. Who we are</h2>
              <p>
                We are a software and IT services company providing product
                development, web and mobile solutions, and related technology
                services for clients. In this Privacy Policy we are referred to
                as &quot;we&quot;, &quot;us&quot; or &quot;our&quot;.
              </p>

              <h2>2. Scope of this Privacy Policy</h2>
              <p>This Policy applies to:</p>
              <ul>
                <li>
                  Visitors to our website and any associated landing pages or
                  microsites.
                </li>
                <li>
                  Prospective and existing clients who communicate with us or
                  use our services.
                </li>
                <li>
                  Individuals who contact us regarding business, support or
                  career opportunities.
                </li>
              </ul>

              <h2>3. Information we collect</h2>
              <p>We may collect the following categories of personal data:</p>
              <ul>
                <li>
                  <strong>Identity and contact data</strong> – such as name,
                  email address, phone number, company name, job title.
                </li>
                <li>
                  <strong>Business information</strong> – such as project
                  details, requirements, documents and communication related to
                  potential or ongoing work.
                </li>
                <li>
                  <strong>Technical data</strong> – such as IP address, browser
                  type, device information, operating system, and approximate
                  location derived from your IP.
                </li>
                <li>
                  <strong>Usage data</strong> – such as pages visited, time
                  spent on pages, navigation patterns, clicks and interactions
                  on our website.
                </li>
                <li>
                  <strong>Communication data</strong> – such as emails,
                  messages, support tickets and any other information you choose
                  to share with us.
                </li>
              </ul>

              <h2>4. How we collect information</h2>
              <p>We collect personal data in the following ways:</p>
              <ul>
                <li>
                  <strong>Directly from you</strong> when you submit a form,
                  request a call, send us an email, subscribe to updates, or
                  participate in a call or meeting.
                </li>
                <li>
                  <strong>Automatically</strong> when you browse our website,
                  via cookies, logs and similar technologies.
                </li>
                <li>
                  <strong>From third parties</strong> such as analytics
                  providers, advertising platforms or referral partners, where
                  this is permitted by law.
                </li>
              </ul>

              <h2>5. How we use your information</h2>
              <p>We use personal data for the following purposes:</p>
              <ul>
                <li>
                  To respond to your inquiries, proposals, support requests or
                  demo calls.
                </li>
                <li>
                  To evaluate and manage potential and existing client
                  relationships.
                </li>
                <li>
                  To operate, maintain and improve our website and services.
                </li>
                <li>
                  To understand how visitors use our website and to improve user
                  experience and content.
                </li>
                <li>
                  To send you relevant updates, service information or marketing
                  communications, where permitted and subject to your
                  preferences.
                </li>
                <li>
                  To comply with legal obligations, enforce our agreements, and
                  protect our rights, systems and users.
                </li>
              </ul>

              <h2>6. Legal bases for processing</h2>
              <p>
                We process personal data on one or more of the following legal
                bases, depending on your location and applicable law:
              </p>
              <ul>
                <li>
                  <strong>Consent</strong> – for example, when you agree to
                  receive marketing emails or provide optional information.
                </li>
                <li>
                  <strong>Contractual necessity</strong> – where processing is
                  required to enter into or perform a contract with you or your
                  organisation.
                </li>
                <li>
                  <strong>Legitimate interests</strong> – such as operating our
                  business, enhancing services, ensuring security and preventing
                  misuse, balanced against your rights and interests.
                </li>
                <li>
                  <strong>Legal obligations</strong> – where we must retain or
                  disclose information to comply with applicable laws or
                  regulations.
                </li>
              </ul>

              <h2>7. Cookies and similar technologies</h2>
              <p>
                We use cookies and similar tracking technologies on our website
                to:
              </p>
              <ul>
                <li>Remember your preferences and improve user experience.</li>
                <li>
                  Analyse website traffic, usage patterns and performance
                  metrics.
                </li>
                <li>Support security and prevent fraudulent activities.</li>
              </ul>
              <p>
                You can manage or disable cookies through your browser settings.
                If you block certain cookies, some features of the website may
                not function properly.
              </p>

              <h2>8. Sharing your information</h2>
              <p>
                We do not sell your personal data. We may share personal data
                only with:
              </p>
              <ul>
                <li>
                  <strong>Service providers and partners</strong> who support
                  our operations (for example, hosting, analytics, email or CRM
                  providers) and who are bound by appropriate confidentiality
                  and data protection obligations.
                </li>
                <li>
                  <strong>Professional advisers</strong> such as legal,
                  accounting or compliance consultants, where necessary.
                </li>
                <li>
                  <strong>Authorities or regulators</strong> when required by
                  law, court order or legal process, or to protect our rights,
                  users or systems.
                </li>
              </ul>

              <h2>9. International transfers</h2>
              <p>
                Depending on your location and the services we use, your
                personal data may be processed in other countries. When we
                transfer personal data internationally, we take appropriate
                steps to ensure an adequate level of protection in accordance
                with applicable data protection laws.
              </p>

              <h2>10. Data retention</h2>
              <p>
                We retain personal data only for as long as it is reasonably
                necessary for the purposes described in this Policy, or as
                required by law. The retention period may depend on the type of
                data, the nature of our relationship with you and legal or
                contractual requirements.
              </p>

              <h2>11. Data security</h2>
              <p>
                We implement reasonable technical and organisational measures to
                protect personal data from unauthorised access, loss, misuse or
                alteration. These measures include access controls, encryption
                where appropriate, secure infrastructure and regular monitoring.
              </p>
              <p>
                However, no method of transmission over the internet or
                electronic storage is completely secure. While we strive to
                protect your information, we cannot guarantee absolute security.
              </p>

              <h2>12. Your rights</h2>
              <p>
                Depending on your jurisdiction, you may have some or all of the
                following rights with respect to your personal data:
              </p>
              <ul>
                <li>
                  The right to request access to the personal data we hold.
                </li>
                <li>
                  The right to request correction of inaccurate or incomplete
                  data.
                </li>
                <li>
                  The right to request deletion of your data, subject to legal
                  obligations.
                </li>
                <li>
                  The right to object to or request restriction of certain
                  processing activities.
                </li>
                <li>
                  The right to withdraw consent where processing is based on
                  consent.
                </li>
                <li>
                  The right to request a copy of your data in a portable format,
                  where applicable.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the
                details provided in the Contact section below. We may need to
                verify your identity before responding to your request.
              </p>

              <h2>13. Third-party websites</h2>
              <p>
                Our website may contain links to third-party websites or
                services. We are not responsible for the privacy practices,
                content or security of those third parties. We encourage you to
                review the privacy policies of any external sites you visit.
              </p>

              <h2>14. Children&apos;s privacy</h2>
              <p>
                Our website and services are not directed to children under the
                age of 13. We do not knowingly collect personal data from
                children. If you believe that a child has provided us with
                personal data, please contact us and we will take appropriate
                steps to delete such data.
              </p>

              <h2>15. Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technologies, legal requirements or
                other factors. When we make material changes, we will update the
                review information at the top of this page. We encourage you to
                review this Policy periodically.
              </p>

              <h2>16. Contact us</h2>
              <p>
                If you have any questions, concerns or requests regarding this
                Privacy Policy or our handling of your personal data, you can
                contact us at:
              </p>
              <p>
                <strong>Email:</strong> support@growcode.com
                <br />
                <strong>Phone:</strong> +91 88494 26805
              </p>
            </div>
          </article>

          {/* Sidebar – visible on page, not in PDF */}
          <aside className="space-y-5 lg:pt-1">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Info className="h-4 w-4 text-sky-500" />
                At a glance
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  We only collect data needed to deliver and improve our
                  services.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  No selling of personal data to third parties.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                  Transparent options to exercise your privacy rights.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-sky-50 text-slate-900 p-5 shadow-sm ring-1 ring-sky-100">
              <h3 className="text-sm font-semibold">Need clarification?</h3>
              <p className="mt-2 text-xs text-slate-700">
                If you have questions about how we handle your data, our team is
                happy to walk you through this Policy in more detail.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-medium text-white shadow hover:bg-sky-700 transition"
              >
                Contact our team
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
