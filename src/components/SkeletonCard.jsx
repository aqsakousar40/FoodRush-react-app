export default function SkeletonCard() {
  return (
    <div className="product-card card skeleton-card">
      <div className="skeleton" style={{ height: 180, borderRadius: '16px 16px 0 0' }} />
      <div className="product-info">
        <div className="skeleton" style={{ width: '40%', height: 12, marginBottom: 10 }} />
        <div className="skeleton" style={{ width: '80%', height: 18, marginBottom: 10 }} />
        <div className="skeleton" style={{ width: '100%', height: 12, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: '60%', height: 12, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: '50%', height: 22 }} />
      </div>
    </div>
  )
}