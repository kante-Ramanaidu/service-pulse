import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>⚡</span>
        <span style={styles.title}>Service Monitor</span>
      </div>
      <div style={styles.right}>
        <span style={styles.user}>👤 {username}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    background: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  left: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '22px' },
  title: { fontSize: '18px', fontWeight: '600', color: '#f1f5f9' },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  user: { fontSize: '14px', color: '#94a3b8' },
  logoutBtn: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '13px',
  },
}

export default Navbar