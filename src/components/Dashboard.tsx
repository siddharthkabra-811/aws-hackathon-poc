import { useState } from "react";
import "./Dashboard.css";

interface InterviewerData {
  companyName: string;
  email: string;
  about: string;
}

interface PDFData {
  interviewerPdf: string; // URL or base64
  intervieweePdf: string; // URL or base64
}

function Dashboard() {
  const [formData, setFormData] = useState<InterviewerData>({
    companyName: "",
    email: "",
    about: "",
  });
  const [pdfData, setPdfData] = useState<PDFData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Uncomment and use this when API endpoint is ready
      /*
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setPdfData({
        interviewerPdf: data.interviewerPdf,
        intervieweePdf: data.intervieweePdf,
      });
      */

      // For now, use static PDFs from public/pdfs folder
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      setPdfData({
        interviewerPdf: "/pdfs/merged_content (1).pdf",
        intervieweePdf: "/pdfs/merged_content (1).pdf",
      });

      alert("Interviewer information submitted successfully!");
      setFormData({ companyName: "", email: "", about: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="dashboard-container">
      <div className="form-card">
        <div className="form-header">
          <h1>Interviewee Information</h1>
          <p className="subtitle">Enter details for the interview session</p>
        </div>

        <form onSubmit={handleSubmit} className="interview-form">
          <div className="form-group">
            <label htmlFor="companyName">
              Company Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Amazon Web Services"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Interviewee Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="interviewer@company.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="about">
              About the Interviewee <span className="required">*</span>
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about the interviewee's background, expertise, and role..."
              required
              className="form-textarea"
              rows={6}
            />
            <span className="char-count">
              {formData.about.length} characters
            </span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit Information"}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>

      {pdfData && (
        <div className="pdf-results-container">
          <div className="results-header">
            <h2>Generated Documents</h2>
            <p>
              Review the generated PDFs for both interviewer and interviewee
            </p>
          </div>

          <div className="pdf-grid">
            <div className="pdf-card">
              <div className="pdf-card-header">
                <h3>📄 Interviewer Document</h3>
                <a
                  href={pdfData?.interviewerPdf}
                  download="interviewer-document.pdf"
                  className="download-btn"
                >
                  Download
                </a>
              </div>
              <div className="pdf-viewer">
                <iframe
                  src={pdfData?.interviewerPdf}
                  title="Interviewer PDF"
                  className="pdf-frame"
                />
              </div>
            </div>

            <div className="pdf-card">
              <div className="pdf-card-header">
                <h3>📝 Interviewee Document</h3>
                <a
                  href={pdfData?.intervieweePdf}
                  download="interviewee-document.pdf"
                  className="download-btn"
                >
                  Download
                </a>
              </div>
              <div className="pdf-viewer">
                <iframe
                  src={pdfData?.intervieweePdf}
                  title="Interviewee PDF"
                  className="pdf-frame"
                />
              </div>
            </div>
          </div>

          <div className="results-actions">
            <button
              className="btn-secondary"
              onClick={() => {
                setPdfData(null);
                setFormData({ companyName: "", email: "", about: "" });
              }}
            >
              Create New Submission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
