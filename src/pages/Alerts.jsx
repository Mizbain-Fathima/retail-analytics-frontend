import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import React from "react";

function sevCls(sev) {
  if (sev === 'CRITICAL') return 'bg-sev-critical/20 border-sev-critical';
  if (sev === 'HIGH') return 'bg-sev-high/20 border-sev-high';
  if (sev === 'MEDIUM') return 'bg-sev-medium/20 border-sev-medium';
  return 'bg-sev-ok/20 border-sev-ok';
}

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/alerts`);
        const data = await res.json();
        setAlerts(data.data || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    };
    fetchAlerts();
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return alerts.filter(a => a.message.toLowerCase().includes(s) || a.type.toLowerCase().includes(s));
  }, [alerts, q]);

  return (
    <div className="animate-slideUp">
      <PageHeader
        icon="⚠️"
        title="Alerts & Notifications"
        subtitle="Dashboard-style grid with clear colors for severity. Search any alert in real time.
        Handle critical items first to protect sales and customer experience."
      />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search alerts..."
        className="w-full glass px-4 py-2 mb-6 outline-none focus:ring-2 focus:ring-brand-gold/60"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a, i) => (
          <div key={i} className={`glass border ${sevCls(a.severity)} p-4 hover:-translate-y-1 transition-transform`}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{new Date(a.timestamp).toLocaleString()}</span>
              <span className="text-xs px-2 py-0.5 rounded-full border border-white/20">{a.type}</span>
            </div>
            <p className="mt-3 font-semibold text-white">{a.message}</p>
            <div className="mt-3 text-xs uppercase tracking-wide">
              Severity: <span className="font-bold">{a.severity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
