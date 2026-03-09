import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    fitnessGoal: 'Fat Loss',
    fitnessLevel: 'Beginner',
    medicalCondition: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('FitFlow AI form data:', formData)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>FitFlow AI</h1>
        <p style={styles.subtitle}>
          Enter your details and let FitFlow AI analyze your fitness profile.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label htmlFor="age" style={styles.label}>
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. 28"
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="weight" style={styles.label}>
              Weight (kg)
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              min="0"
              value={formData.weight}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. 72"
              required
            />
          </div>

          <div style={styles.inlineGroup}>
            <div style={styles.inlineField}>
              <label htmlFor="fitnessGoal" style={styles.label}>
                Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Fat Loss">Fat Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Endurance">Endurance</option>
              </select>
            </div>

            <div style={styles.inlineField}>
              <label htmlFor="fitnessLevel" style={styles.label}>
                Fitness Level
              </label>
              <select
                id="fitnessLevel"
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="medicalCondition" style={styles.label}>
              Medical Condition
            </label>
            <input
              id="medicalCondition"
              name="medicalCondition"
              type="text"
              value={formData.medicalCondition}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g. Asthma, knee pain, none"
            />
          </div>

          <button type="submit" style={styles.button}>
            Analyze My Fitness
          </button>
        </form>
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
    maxWidth: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    padding: '28px 26px 24px',
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
    marginBottom: '22px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.78rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#6b7280',
  },
  input: {
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '10px 12px',
    fontSize: '0.95rem',
    backgroundColor: '#f9fafb',
    color: '#111827',
    outline: 'none',
    transition:
      'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
  },
  select: {
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '10px 12px',
    fontSize: '0.95rem',
    backgroundColor: '#f9fafb',
    color: '#111827',
    outline: 'none',
    transition:
      'border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
  },
  inlineGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  inlineField: {
    flex: 1,
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  button: {
    marginTop: '10px',
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
  },
}

export default App
