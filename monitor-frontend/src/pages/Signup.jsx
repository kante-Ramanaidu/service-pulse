import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await api.post('/auth/register', { username, password })
      setIsError(false)
      setMessage(res.data.message || 'Account created successfully!')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setIsError(true)
      setMessage('Signup failed. Username may already exist.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🚀</div>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Service Health Monitor</p>

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Choose a username"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Choose a password"
              required
            />
          </div>

          {message && (
            <p style={{ ...styles.message, color: isError ? '#f87171' : '#4ade80' }}>
              {message}
            </p>
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={styles.loginLink}>
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f172a',
  },
  card: {
    background: '#1e293b',
    padding: '40px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #334155',
    textAlign: 'center',
  },
  logo: { fontSize: '40px', marginBottom: '12px' },
  title: { fontSize: '24px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' },
  subtitle: { fontSize: '14px', color: '#94a3b8', marginBottom: '32px' },
  form: { textAlign: 'left' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '14px',
  },
  message: { fontSize: '13px', marginBottom: '12px', textAlign: 'center' },
  button: {
    width: '100%',
    padding: '12px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '8px',
    cursor: 'pointer',
  },
  loginText: { marginTop: '20px', fontSize: '13px', color: '#94a3b8' },
  loginLink: { color: '#6366f1', cursor: 'pointer', fontWeight: '500' },
}