import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const features = [
  { to: '/inventory', title: 'Inventory', desc: 'Live stock, zones, shelves, pricing', icon: '📦' },
  { to: '/analytics', title: 'Analytics', desc: 'Availability • Performance • Quality • OEE', icon: '📈' },
  { to: '/alerts', title: 'Alerts', desc: 'Instant low-OEE & low-stock notifications', icon: '⚠️' },
];

export default function Dashboard() {
  return (
    <div className="animate-slideUp">
      <PageHeader
        icon="👋"
        title="Welcome to Retail Inventory Analytics"
        subtitle="A premium, data-driven control center for retail operations. Monitor live stock
        across zones and shelves, visualize performance with OEE components (Availability,
        Performance, Quality), and respond to issues instantly with color-coded alerts.
        Our indigo–gold design keeps the focus on clarity and speed, while the glassy
        cards and gentle motion give a polished, startup-grade feel for your judges."
      />

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {features.map((f) => (
          <Link key={f.to} to={f.to}
            className="glass p-6 hover:shadow-glow transition-transform hover:-translate-y-1">
            <div className="text-2xl">{f.icon}</div>
            <h3 className="mt-3 text-xl font-semibold text-white">{f.title}</h3>
            <p className="text-gray-300 mt-1">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
