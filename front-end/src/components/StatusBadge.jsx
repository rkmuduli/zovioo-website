export default function StatusBadge({ status, className }) {
  const c = className ?? (status === 'Pending' ? 'pending' : status === 'Cancelled' ? 'cancelled' : '');
  return <span className={`status ${c}`.trim()}>{status}</span>;
}
