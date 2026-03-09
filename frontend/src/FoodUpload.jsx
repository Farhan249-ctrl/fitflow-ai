
import { useState } from 'react';

function FoodUpload() {
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleAnalyze = () => {
    console.log('Analyzing food image...')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Food Upload</h1>
        <p style={styles.subtitle}>
          Upload a photo of your meal and let FitFlow AI analyze its nutritional profile.
        </p>

        <div style={styles.uploadSection}>
          <label style={styles.uploadLabel}>
            <div style={styles.uploadArea}>
              <div style={styles.uploadIcon}>📷</div>
              <div style={styles.uploadText}>
                <span style={styles.uploadPrimary}>Click to upload</span>
                <span style={styles.uploadSecondary}>or drag & drop</span>
                <span style={styles.uploadHint}>JPEG, PNG up to 10MB</span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              style={styles.fileInput}
              onChange={handleFileChange}
            />
          </label>

          {previewUrl && (
            <div style={styles.previewWrapper}>
              <div style={styles.previewLabel}>Preview</div>
              <div style={styles.previewFrame}>
                <img
                  src={previewUrl}
                  alt="Food preview"
                  style={styles.previewImage}
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          style={styles.button}
          onClick={handleAnalyze}
          disabled={!previewUrl}
        >
          Analyze Food
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: '32px 16px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, system-ui, "SF Pro Text", "Segoe UI", sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '560px',
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    padding: '26px 24px 22px',
    boxShadow:
      '0 18px 45px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(148, 163, 184, 0.08)',
    color: '#111827',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: '4px',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6b7280',
    marginBottom: '20px',
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  uploadLabel: {
    display: 'block',
    cursor: 'pointer',
  },
  uploadArea: {
    borderRadius: '14px',
    border: '1px dashed #cbd5f5',
    backgroundColor: '#f9fafb',
    padding: '14px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  uploadIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '999px',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
  },
  uploadText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  uploadPrimary: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: '#2563EB',
  },
  uploadSecondary: {
    fontSize: '0.9rem',
    color: '#4b5563',
  },
  uploadHint: {
    fontSize: '0.78rem',
    color: '#9ca3af',
  },
  fileInput: {
    display: 'none',
  },
  previewWrapper: {
    marginTop: '4px',
  },
  previewLabel: {
    fontSize: '0.78rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#6b7280',
    marginBottom: '6px',
  },
  previewFrame: {
    borderRadius: '14px',
    border: '1px solid #e5e7eb',
    padding: '6px',
    backgroundColor: '#f9fafb',
  },
  previewImage: {
    width: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    maxHeight: '260px',
  },
  button: {
    marginTop: '18px',
    borderRadius: '999px',
    border: 'none',
    padding: '11px 20px',
    fontSize: '0.95rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    backgroundColor: '#2563EB',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(37, 99, 235, 0.25)',
    transition:
      'transform 120ms ease, box-shadow 120ms ease, filter 120ms ease',
    width: '100%',
  },
}

export default FoodUpload