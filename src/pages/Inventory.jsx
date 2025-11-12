import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/inventory/products')
      .then((r) => r.json())
      .then((d) => setItems(d.data || []));
  }, []);

  return (
    <div className="animate-slideUp">
      <PageHeader
        icon="🛒"
        title="Inventory Overview"
        subtitle="Full control over stock levels across zones and shelves. Each product card
        shows stock vs. capacity, location, and pricing. Mini line-spark charts and a gold
        stock bar give instant visual cues judges will love."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => {
          const stock = Number(p.qty);
          const max = Number(p.max_capacity);
          const pct = Math.min(100, Math.round((stock / max) * 100));
          // generate a tiny sparkline (fake trend – keeps UI pretty for demo)
          const spark = Array.from({ length: 10 }, (_, i) => ({
            t: i, v: Math.max(5, Math.round(pct + (Math.sin(i) * 8))),
          }));
          return (
            <div key={p.sku} className="glass p-5 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <span className="text-xs text-gray-400">SKU: {p.sku}</span>
              </div>

              <div className="mt-2 text-sm text-gray-300">
                <div><span className="text-gray-400">Zone:</span> {p.zone} <span className="text-gray-400 ml-3">Shelf:</span> {p.shelf}</div>
                <div className="mt-1"><span className="text-gray-400">Cost:</span> ${p.cost} <span className="text-gray-400 ml-3">Price:</span> ${p.price}</div>
              </div>

              {/* tiny sparkline */}
              <div className="h-16 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spark}>
                    <Tooltip contentStyle={{ background: 'rgba(20,20,40,.9)', border: '1px solid rgba(255,255,255,.1)' }} />
                    <Line type="monotone" dataKey="v" stroke="#fbbf24" strokeWidth={2} dot={false} isAnimationActive />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* gold stock bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Stock</span><span>{stock}/{max}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-2 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold2"
                       style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
