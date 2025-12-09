import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CalendarDays,
  RefreshCcw,
  Scale,
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
    lastReview = new Date(year, 0, 1); 
    nextReview = new Date(year, 6, 1); 
  } else {
    lastReview = new Date(year, 6, 1);
    nextReview = new Date(year + 1, 0, 1); 
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

export default function TermsAndConditions() {
  const { lastReviewLabel, nextReviewLabel } = getReviewInfo();
  const termsRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadPdf = async () => {
    if (!termsRef.current) return;

    const text = termsRef.current.innerText || "";
    if (!text.trim()) return;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // ---- Header: logo + title ----
    const logoDataUrl = await loadLogoAsDataUrl("/logo.png");

    if (logoDataUrl) {
      doc.addImage(logoDataUrl, "PNG", 15, 10, 25, 10);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("GrowCode Solution", logoDataUrl ? 45 : 15, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Terms & Conditions", logoDataUrl ? 45 : 15, 24);

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

    doc.save("Growcode-terms and conditions.pdf");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO / HEADER */}
      <section className="relative border-b bg-gradient-to-br from-violet-50 via-white to-emerald-50">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25)_0,_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(34,197,94,0.25)_0,_transparent_55%)]" />
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

              <span className="hidden items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 md:inline-flex">
                <FileText className="h-3.5 w-3.5" />
                Legal terms &amp; usage
              </span>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-600 px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-violet-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                Terms &amp; Conditions
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Terms &amp; Conditions
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                These Terms &amp; Conditions govern your access to and use of
                our website and services. By using our website or engaging with
                us, you agree to be bound by these Terms.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-600" />
                  <span className="font-medium text-slate-800">
                    Last reviewed:
                  </span>
                  <span className="text-slate-700">{lastReviewLabel}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 ring-1 ring-violet-200">
                  <RefreshCcw className="h-3.5 w-3.5 text-violet-600" />
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
                <div className="absolute -top-6 -right-10 h-24 w-24 rounded-full bg-violet-100 blur-2xl" />
                <div className="absolute -bottom-10 -left-4 h-20 w-28 rounded-full bg-emerald-100 blur-2xl" />
                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700">
                    <Scale className="h-3.5 w-3.5 text-violet-600" />
                    Fair usage &amp; mutual trust
                  </div>
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    These Terms are designed to clearly describe how our website
                    and services may be used, and to protect both your interests
                    and ours in a transparent and professional way.
                  </p>
                  <ul className="space-y-1.5 text-[12px] text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Clear responsibilities for both parties
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                      Protection of intellectual property and data
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                      Transparent dispute and governing law clauses
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
          {/* Terms text (PDF source) */}
          <article
            ref={termsRef}
            className="overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-8"
          >
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using our website, submitting forms, requesting
                information, or entering into a service engagement with us, you
                acknowledge that you have read, understood, and agree to be
                bound by these Terms &amp; Conditions and our Privacy Policy.
              </p>

              <h2>2. Who we are</h2>
              <p>
                We are a software and IT services company providing product
                development, web and mobile engineering, UX/UI design,
                consulting, and other technology-related services for clients.
              </p>

              <h2>3. Use of the website</h2>
              <p>You agree to use our website only for lawful purposes and not to:</p>
              <ul>
                <li>
                  Violate any applicable law, regulation, or third-party rights.
                </li>
                <li>
                  Attempt to gain unauthorised access to our systems, data or
                  infrastructure.
                </li>
                <li>
                  Interfere with the security or performance of our website or
                  services.
                </li>
                <li>
                  Use our website to distribute harmful, fraudulent or abusive
                  content.
                </li>
              </ul>

              <h2>4. Service engagements</h2>
              <p>
                Any specific project, engagement or service we provide will be
                governed by a separate written agreement, proposal or Statement
                of Work (SOW) agreed between you and us. In case of conflict,
                the terms in the signed contract or SOW will take precedence
                over these general Terms.
              </p>

              <h2>5. Intellectual property</h2>
              <p>
                Unless otherwise agreed in writing, we retain all rights, title
                and interest in:
              </p>
              <ul>
                <li>Our website, branding and visual identity.</li>
                <li>
                  Our proprietary software, tools, libraries, templates and
                  methodologies.
                </li>
                <li>
                  Any content, copy or materials appearing on our website,
                  except where clearly attributed to third parties.
                </li>
              </ul>
              <p>
                You may not copy, reproduce, modify, distribute, or create
                derivative works from our website content without our prior
                written consent, except as permitted by applicable law.
              </p>

              <h2>6. Client materials</h2>
              <p>
                During a project, you may provide us with content, data, assets
                or other materials (&quot;Client Materials&quot;). You remain
                the owner of such materials. You grant us a limited,
                non-exclusive license to use Client Materials solely for the
                purpose of delivering the agreed services.
              </p>

              <h2>7. Confidentiality</h2>
              <p>
                We treat client information and project details as confidential.
                We will not disclose such information to third parties except:
              </p>
              <ul>
                <li>Where required to deliver the services (e.g., subcontractors).</li>
                <li>Where required by law or legal process.</li>
                <li>Where we have your prior written consent.</li>
              </ul>
              <p>
                Any formal non-disclosure obligations may also be set out in a
                separate NDA or service agreement.
              </p>

              <h2>8. Portfolio and case studies</h2>
              <p>
                Unless otherwise agreed, we may reference your project in our
                portfolio or marketing materials (for example, showcasing
                designs, screenshots or a high-level description of the
                solution), provided no confidential information is disclosed.
              </p>

              <h2>9. Third-party services and links</h2>
              <p>
                Our website may include links or references to third-party
                websites, tools or services. We do not control and are not
                responsible for the content, policies or practices of such third
                parties. Your use of third-party services is subject to their
                own terms and conditions.
              </p>

              <h2>10. Disclaimers</h2>
              <p>
                Our website and its content are provided on an &quot;as is&quot;
                and &quot;as available&quot; basis. While we make reasonable
                efforts to ensure accuracy and availability, we do not guarantee
                that:
              </p>
              <ul>
                <li>The website will be uninterrupted, secure or error-free.</li>
                <li>
                  The content is complete, current or free from typographical
                  errors.
                </li>
                <li>
                  Any defects will always be corrected immediately or without
                  impact.
                </li>
              </ul>
              <p>
                To the maximum extent permitted by law, we disclaim all
                warranties, whether express or implied, including any implied
                warranties of merchantability, fitness for a particular purpose
                and non-infringement.
              </p>

              <h2>11. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, we will not be liable
                for any indirect, incidental, special, consequential or punitive
                damages, or any loss of profits, revenue, data or business
                opportunities, arising out of or in connection with:
              </p>
              <ul>
                <li>Your use or inability to use our website.</li>
                <li>
                  Any errors, interruptions, security incidents or data loss
                  related to the website.
                </li>
                <li>
                  Any actions or content of third parties linked or referred to
                  on our website.
                </li>
              </ul>
              <p>
                Where our liability cannot be excluded, it will be limited to
                the amount you have paid us for the relevant services in the 3
                months preceding the event giving rise to the claim, or to the
                minimum amount permitted by applicable law.
              </p>

              <h2>12. Indemnity</h2>
              <p>
                You agree to indemnify and hold us harmless from any claims,
                damages or losses (including reasonable legal fees) arising out
                of your misuse of our website, your violation of these Terms, or
                your infringement of any third-party rights.
              </p>

              <h2>13. Changes to the website and services</h2>
              <p>
                We may update, modify, suspend or discontinue any part of the
                website or our services at any time, with or without notice,
                provided this does not violate any existing contractual
                obligations towards you.
              </p>

              <h2>14. Changes to these Terms</h2>
              <p>
                We may update these Terms &amp; Conditions from time to time to
                reflect changes in our services, business, legal requirements or
                other reasons. When we make material changes, we will update the
                review information at the top of this page. Your continued use
                of the website after such changes will constitute acceptance of
                the updated Terms.
              </p>

              <h2>15. Governing law and jurisdiction</h2>
              <p>
                These Terms &amp; Conditions are governed by and construed in
                accordance with the laws of India, without regard to conflict of
                law principles. Any disputes arising out of or in connection
                with these Terms shall be subject to the exclusive jurisdiction
                of the courts located in Gujarat, India, unless otherwise
                required by applicable law.
              </p>

              <h2>16. Contact us</h2>
              <p>
                If you have any questions about these Terms &amp; Conditions, or
                wish to discuss a specific engagement or issue, you can contact
                us at:
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
                <FileText className="h-4 w-4 text-violet-500" />
                Summary of these Terms
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                  Use the website lawfully and do not attempt to compromise our
                  systems.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Specific projects are always governed by a dedicated
                  agreement/SOW.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  We limit our liability to what is reasonable and lawful.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-violet-50 text-slate-900 p-5 shadow-sm ring-1 ring-violet-100">
              <h3 className="text-sm font-semibold">Need to clarify a clause?</h3>
              <p className="mt-2 text-xs text-slate-700">
                If any part of these Terms is unclear or you need a formal
                agreement for a specific engagement, our team can support you.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-4 py-2 text-xs font-medium text-white shadow hover:bg-violet-700 transition"
              >
                Talk to our team
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
