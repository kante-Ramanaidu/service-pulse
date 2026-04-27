import { useState } from 'react'
import api from '../api/axios'

function AddServiceModal({ onClose, onAdded }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/services', { name, url, description })
      onAdded(response.data)
      onClose()
    } catch (err) {
      setError('Failed to add service. Check the URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Register New Service</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Service Name</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. SkillSwap Auth Service"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Health Check URL</label>
            <input
              style={styles.input}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. http://localhost:3000/health"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description (optional)</label>
            <input
              style={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this service do?"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Registering...' : 'Register Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#1e293b',
    borderRadius: '16px',
    padding: '28px',
    width: '100%',
    maxWidth: '460px',
    border: '1px solid #334155',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  modalTitle: { fontSize: '18px', fontWeight: '600', color: '#f1f5f9' },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: '18px',
    cursor: 'pointer',
  },
  inputGroup: { marginBottom: '18px' },
  label: { display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '11px 14px',
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '14px',
  },
  error: { color: '#f87171', fontSize: '13px', marginBottom: '12px' },
  actions: { display: 'flex', gap: '12px', marginTop: '8px' },
  cancelBtn: {
    flex: 1,
    padding: '11px',
    background: 'transparent',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '14px',
  },
  submitBtn: {
    flex: 1,
    padding: '11px',
    background: '#6366f1',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
  },
}

export default AddServiceModal