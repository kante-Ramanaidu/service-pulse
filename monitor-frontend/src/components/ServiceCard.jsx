import api from '../api/axios'

function ServiceCard({ service, onDelete, onRefresh }) {

  const handleCheck = async () => {
    try {
      await api.get(`/services/${service.id}/check`)
      onRefresh()
    } catch (err) {
      console.error('Check failed', err)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete "${service.name}"?`)) {
      try {
        await api.delete(`/services/${service.id}`)
        onDelete(service.id)
      } catch (err) {
        console.error('Delete failed', err)
      }
    }
  }

  const statusConfig = {
    UP:       { color: '#22c55e', bg: '#052e16', label: '● UP' },
    DOWN:     { color: '#ef4444', bg: '#2d0a0a', label: '● DOWN' },
    DEGRADED: { color: '#f59e0b', bg: '#2d1f02', label: '● DEGRADED' },
    UNKNOWN:  { color: '#94a3b8', bg: '#1e293b', label: '● UNKNOWN' },
  }

  const cfg = statusConfig[service.status] || statusConfig.UNKNOWN

  const formatTime = (dateStr) => {
    if (!dateStr) return 'Never'
    return new Date(dateStr).toLocaleTimeString()
  }

  return (
    <div style={{ ...styles.card, borderColor: cfg.color + '44' }}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.name}>{service.name}</h3>
          <p style={styles.url}>{service.url}</p>
        </div>
        <span style={{ ...styles.badge, color: cfg.color, background: cfg.bg }}>
          {cfg.label}
        </span>
      </div>

      {service.description && (
        <p style={styles.desc}>{service.description}</p>
      )}

      <div style={styles.meta}>
        <span style={styles.metaItem}>
          🕐 Last checked: {formatTime(service.lastChecked)}
        </span>
        {service.responseTime && (
          <span style={styles.metaItem}>
            ⚡ {service.responseTime}ms
          </span>
        )}
      </div>

      <div style={styles.actions}>
        <button onClick={handleCheck} style={styles.checkBtn}>
          Check Now
        </button>
        <button onClick={handleDelete} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#1e293b',
    border: '1px solid',
    borderRadius: '12px',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  name: { fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' },
  url: { fontSize: '12px', color: '#64748b', wordBreak: 'break-all' },
  badge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  desc: { fontSize: '13px', color: '#94a3b8', marginBottom: '12px' },
  meta: { display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' },
  metaItem: { fontSize: '12px', color: '#64748b' },
  actions: { display: 'flex', gap: '10px' },
  checkBtn: {
    flex: 1,
    padding: '8px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
  },
  deleteBtn: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef444444',
    borderRadius: '8px',
    fontSize: '13px',
  },
}

export default ServiceCard