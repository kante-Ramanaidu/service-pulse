import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ServiceCard from '../components/ServiceCard'
import AddServiceModal from '../components/AddServiceModal'
import api from '../api/axios'

function Dashboard() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('ALL')

  const fetchServices = async () => {
    try {
      const response = await api.get('/services')
      setServices(response.data)
    } catch (err) {
      console.error('Failed to fetch services', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchServices, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const handleAdded = (newService) => {
    setServices((prev) => [...prev, newService])
  }

  const filtered = filter === 'ALL'
    ? services
    : services.filter((s) => s.status === filter)

  const counts = {
    ALL: services.length,
    UP: services.filter((s) => s.status === 'UP').length,
    DOWN: services.filter((s) => s.status === 'DOWN').length,
    DEGRADED: services.filter((s) => s.status === 'DEGRADED').length,
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.content}>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <StatCard label="Total Services" value={counts.ALL} color="#6366f1" />
          <StatCard label="Up" value={counts.UP} color="#22c55e" />
          <StatCard label="Down" value={counts.DOWN} color="#ef4444" />
          <StatCard label="Degraded" value={counts.DEGRADED} color="#f59e0b" />
        </div>

        {/* Header Row */}
        <div style={styles.headerRow}>
          <h2 style={styles.heading}>Monitored Services</h2>
          <button onClick={() => setShowModal(true)} style={styles.addBtn}>
            + Register Service
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={styles.filterRow}>
          {['ALL', 'UP', 'DOWN', 'DEGRADED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? '#6366f1' : 'transparent',
                color: filter === f ? '#fff' : '#94a3b8',
                border: filter === f ? 'none' : '1px solid #334155',
              }}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <p style={styles.empty}>Loading services...</p>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🔍</p>
            <p style={styles.emptyText}>No services found</p>
            <p style={styles.emptySubText}>Click "Register Service" to add one</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onDelete={handleDelete}
                onRefresh={fetchServices}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddServiceModal
          onClose={() => setShowModal(false)}
          onAdded={handleAdded}
        />
      )}
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div style={statStyles.card}>
      <p style={{ ...statStyles.value, color }}>{value}</p>
      <p style={statStyles.label}>{label}</p>
    </div>
  )
}

const statStyles = {
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '20px',
    flex: 1,
    textAlign: 'center',
  },
  value: { fontSize: '32px', fontWeight: '700', marginBottom: '4px' },
  label: { fontSize: '13px', color: '#64748b' },
}

const styles = {
  page: { minHeight: '100vh', background: '#0f172a' },
  content: { maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' },
  statsRow: { display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: { fontSize: '20px', fontWeight: '600', color: '#f1f5f9' },
  addBtn: {
    padding: '10px 20px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  filterRow: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' },
  filterBtn: {
    padding: '7px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '16px',
  },
  empty: { color: '#64748b', textAlign: 'center', padding: '40px 0' },
  emptyState: { textAlign: 'center', padding: '60px 0' },
  emptyIcon: { fontSize: '40px', marginBottom: '12px' },
  emptyText: { fontSize: '18px', color: '#94a3b8', marginBottom: '6px' },
  emptySubText: { fontSize: '14px', color: '#475569' },
}

export default Dashboard