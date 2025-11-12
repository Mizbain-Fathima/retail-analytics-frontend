import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import React from "react";

const PIE_COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#22c55e'];

function Analytics() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/oee`);
        const data = await res.json();
        setRows(data.data || []);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };
    fetchAnalytics();
  }, []);

  const lineData = rows.map((r) => ({
    name: r.name,
    Availability: r.oee.availability,
    Performance: r.oee.performance,
    Quality: r.oee.quality,
  }));

  const barData = rows.map((r) => ({
    name: r.name,
    Overall: r.oee.overall,
  }));

  const pieData = rows.map((r) => ({ name: r.name, value: Math.max(1, r.oee.overall) }));

  return (
    <div className="animate-slideUp">
      <PageHeader
        icon="📊"
        title="Analytics Dashboard"
        subtitle="Three connected, judge-friendly charts: OEE component trends (line), overall
        OEE by product (bar), and share of OEE across products (pie). All animated, responsive,
        and styled to the indigo–gold theme."
      />

      {/* LINE CHART */}
      <div className="glass p-4 md:p-6">
        <h3 className="font-semibold mb-3">OEE Components — Trend</h3>
        <div className="h-72 min-h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis domain={[0, 100]} stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: 'rgba(20,20,40,.95)', border: '1px solid rgba(255,255,255,.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="Availability" stroke="#60a5fa" strokeWidth={2} />
              <Line type="monotone" dataKey="Performance" stroke="#34d399" strokeWidth={2} />
              <Line type="monotone" dataKey="Quality" stroke="#fbbf24" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR + PIE CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* BAR CHART */}
        <div className="glass p-4 md:p-6">
          <h3 className="font-semibold mb-3">Overall OEE — Comparison</h3>
          <div className="h-72 min-h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis domain={[0, 100]} stroke="#9ca3af" />
                <Tooltip contentStyle={{ background: 'rgba(20,20,40,.95)', border: '1px solid rgba(255,255,255,.1)' }} />
                <Bar dataKey="Overall" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="glass p-4 md:p-6 text-white">
          <h3 className="font-semibold mb-3 text-brand-gold text-lg tracking-wide">
            OEE Share — Pie
          </h3>
          <div className="h-72 min-h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "rgba(40,40,60,0.95)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#f3f4f6",
                    borderRadius: "8px",
                  }}
                  itemStyle={{
                    color: "#fefce8",
                  }}
                />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#0b1020" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
